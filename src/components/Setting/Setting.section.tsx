import { useRef } from 'react';
import { TimerSetting } from './TimerSetting';
import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

const Setting = () => {
    const timerSetting = useAtomValue(timerSettingsAtom);
    const dialog = useRef<HTMLDialogElement | null>(null);

    function showModal() {
        (dialog.current as HTMLDialogElement).showModal();
    }

    function hideModal() {
        (dialog.current as HTMLDialogElement).close();
    }

    return (
        <div>
            <button
                type="button"
                className="button"
                data-type="secondary"
                data-size="small"
                onClick={showModal}
            >
                {/* note: i have to make the icon inherit the parent color, in this case white */}
                <span>❤️</span>
                <span>Settings</span>
            </button>

            <dialog
                ref={dialog}
                // w-full max-w-[30rem] rounded-lg bg-gray-50 p-4 px-5 backdrop:bg-white/50
                className="dialog | box"
            >
                <div className="dialog__header | box | flex-row">
                    <span className="font-bold uppercase">Setting</span>
                    <button
                        type="button"
                        className="button to-right"
                        data-type="naked"
                        aria-label="close button"
                        onClick={hideModal}
                    >
                        Close
                    </button>
                </div>
                <div className="dialog__content | box">
                    <TimerSetting />
                </div>
                {/* TaskSetting */}
                {/* SoundSetting */}
                <div className="dialog__footer | box">
                    <button
                        className="button to-right"
                        data-type="confirm"
                        data-size="medium"
                        disabled={timerSetting.pomodoroDuration <= 0}
                        onClick={hideModal}
                    >
                        OK
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export { Setting };