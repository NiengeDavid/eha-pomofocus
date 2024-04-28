import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import { selectedTodoIdAtom, timerSettingsAtom, todosAtom } from '../lib';
import { Todo, TodoFormData, TodoActions } from '../types';
import {
    updateSelectedTodoIdFromStorage,
    updateUserTodosFromStorage,
} from '../utils';

interface UseTodos {
    todos: Todo[];
    selectedTodoId: string;
    setSelectedTodoId: (id: string) => void;
    todoActions: TodoActions;
}


/*

const getTotalMinutesBasedOnUnfinishedTodo = () => {

}

const getUnfinishedTodoAmount = (todos: Todo[]) => {

}

 [X] getUnfinishedTodoAmount
 [X] getSessions based on todo sessions - pomodoro, shortbreak, longbreak 
 getTotalMinutesBasedOnSessions
 estimateFinishTime based on total minutes (in 24 hour form)

note: gethours will get hours 

*/

const useTodos = (): UseTodos => {
    const [todos, setTodos] = useAtom<Todo[]>(todosAtom);
    const [selectedTodoId, setSelectedTodoId] = useAtom(selectedTodoIdAtom);
    useAtomValue(timerSettingsAtom)

    useEffect(() => {
        updateUserTodosFromStorage(todos);
    }, [todos]);

    useEffect(() => {
        updateSelectedTodoIdFromStorage(selectedTodoId);
    }, [selectedTodoId]);

    function selectFirstTodoIfOnlyOneExists(todos: Todo[]) {
        if (todos.length === 1) {
            setSelectedTodoId(todos[0].id);
        }
    }

    function add(formData: TodoFormData) {
        const updatedTodos = [
            ...todos,
            {
                title: formData.title,
                completed: false,
                id: self.crypto.randomUUID(),
                targetPomodoro: formData.targetPomodoro,
                completedPomodoro: 0,
            },
        ];

        selectFirstTodoIfOnlyOneExists(updatedTodos);
        setTodos(updatedTodos);
    }

    function edit(id: string, formData: TodoFormData) {
        const todo = todos.find((todo) => todo.id === id) as Todo;
        const updatedTodo = { ...todo, ...formData };
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function remove(id: string) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        selectFirstTodoIfOnlyOneExists(updatedTodos);
        setTodos(updatedTodos);
    }

    function toggleState(id: string) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function clearAll() {
        setTodos([]);
        setSelectedTodoId('');
    }

    function clearCompleted() {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);

        if (updatedTodos.length > 0) {
            setSelectedTodoId(updatedTodos[0].id);
        } else {
            setSelectedTodoId('');
        }
    }

    function incrementPomodoro(id: string) {
        const key = 'completedPomodoro';

        const todo = todos.find((todo) => todo.id === id) as Todo;
        const updatedTodo = {
            ...todo,
            [key]: todo[key] + 1,
        };
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function find(id: string): Todo | undefined {
        return todos.find((todo) => todo.id === id);
    }

    const todoActions: TodoActions = {
        add,
        edit,
        remove,
        toggleState,
        clearAll,
        clearCompleted,
        incrementPomodoro,
        find,
    };

    return { todos, selectedTodoId, setSelectedTodoId, todoActions };
};

export { useTodos };
