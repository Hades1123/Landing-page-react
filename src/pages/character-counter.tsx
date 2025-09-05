import { CheckBox } from "@/components/character-counter/checkbox";
import { useEffect, useState } from "react";
import { Card } from "@/components/character-counter/card";

export const CharacterCounterPage = () => {
    const [currentText, setCurrentText] = useState("");
    const [totalCharacter, setTotalCharacter] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [excludeSpace, setExcludeSpace] = useState<boolean>(false);
    const [charFrequency, setCharFrequency] = useState<Map<string, number>>(new Map());
    const [showAll, setShowAll] = useState(false);
    const [isOpenCharacterLimit, setIsOpenCharacterLimit] = useState<boolean>(false);
    const [limit, setLimit] = useState(100);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentText(event.target.value);
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isOpenCharacterLimit && totalCharacter >= limit + 1) {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'];
            if (!allowedKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
            }
        }
    }
    const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isNaN(+value)) {
            setLimit(Math.min(999, +value));
        }
        else {
            setLimit(100);
        }
    }
    useEffect(() => {
        let sliceText = currentText;
        if (excludeSpace) {
            sliceText = sliceText.replace(/\s/g, '');
        }
        setTotalCharacter(sliceText.length);
        setWordCount(sliceText.split(' ').filter(item => item != '').length);
        setSentenceCount(sliceText.split('.').filter(item => item.trim() != '').length);
        const freq = new Map();
        for (const ch of sliceText) {
            freq.set(ch.toUpperCase(), (freq.get(ch.toUpperCase()) || 0) + 1);
        }
        setCharFrequency(freq);
    }, [currentText, excludeSpace, isOpenCharacterLimit, limit]);

    return (
        <div
            className="px-4 pt-4 pb-8 min-h-screen font-DMSans flex flex-col gap-10 bg-[#fff] md:py-[1.12rem] md:px-[2rem]
                        lg:py-[2rem] lg:px-[14rem]"
        >
            <header className="flex justify-between items-center py-4">
                {/* logo */}
                <div className="flex gap-[0.56rem] items-center">
                    <img src="/character-counter/Group 2.svg" alt="svg" />
                    <span className="text-[1.125rem] font-[600] ">Character Counter</span>
                </div>
                {/* dark-mode  */}
                <button className="rounded-[0.375rem] bg-[#F2F2F7] size-8 flex items-center justify-center">
                    <img src="/character-counter/Settings Icon.svg" alt="moon" />
                </button>
            </header>
            {/* title  */}
            <h1 className="text-center text-[#12131A] font-[700] text-[2.5rem]">Analyze your text in real-time.</h1>
            {/* input  */}
            <div>
                <textarea
                    className="mb-4 text-[1.25rem] p-[0.75rem] rounded-[0.75rem] border-[2px] border-[#E4E4EF] bg-[#F2F2F7]
                    w-full min-h-[12.5rem] outline-none focus:border-[#C27CF8] focus:shadow-[0_0_10px_0_#D3A0FA]"
                    placeholder="Type your text here..."
                    value={currentText}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                >
                </textarea>
                {(totalCharacter >= limit + 1 && isOpenCharacterLimit) &&
                    (<>
                        <div className="text-[#DA3701] font-[400] flex gap-2 items-center mb-4">
                            <div className="mr-2 size-[0.875rem] border-red-500 rounded-full border-[1px] flex items-center justify-center text-[0.875rem]">i</div>
                            <span>Limit reached! Your text exceeds {limit} characters.</span>
                        </div>
                    </>)
                }
                {/* options */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <CheckBox
                            checked={excludeSpace}
                            onClick={() => setExcludeSpace(!excludeSpace)}
                        >
                            Exclude Spaces
                        </CheckBox>
                        <div className="flex gap-4">
                            <CheckBox
                                checked={isOpenCharacterLimit}
                                onClick={() => setIsOpenCharacterLimit(!isOpenCharacterLimit)}
                            >
                                Set Character Limit
                            </CheckBox>
                            {isOpenCharacterLimit && <input
                                type="text"
                                className="py-1 px-3 w-[3.4375rem] rounded-[0.375rem] border-[1px] border-[#404254]"
                                value={limit}
                                onChange={onChangeLimit}
                            />}
                        </div>
                    </div>
                    <div>Apprx. reading time: {'<'}1 minute</div>
                </div>
            </div>
            {/* main-content  */}
            <main>
                {/* statics */}
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                    <Card
                        total={totalCharacter}
                        className="bg-[#D3A0FA]"
                    >
                        Total Characters
                    </Card>
                    <Card
                        total={wordCount}
                        className="bg-[#FF9F00]"
                    >
                        Word Count
                    </Card>
                    <Card
                        total={sentenceCount}
                        className="bg-[#FE8159]"
                    >
                        Sentence Count
                    </Card>
                </div>

                {/* letter density  */}
                <div className="flex flex-col gap-5">
                    <h1 className="text-[1.5rem] font-[600]">Letter Density</h1>
                    {currentText.length ?
                        (<>
                            <div className="flex flex-col gap-4">
                                {
                                    [...charFrequency.entries()]
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, showAll ? undefined : 5)
                                        .map(([char, count]) => (
                                            <div key={char} className="flex gap-4 h-[0.725rem] items-center">
                                                <div className="w-1">{char === ' ' ? '␣' : char}</div>
                                                <div className="flex-1 bg-[#F2F2F7] rounded-[63rem] h-full">
                                                    <div
                                                        className="bg-[#D3A0FA] rounded-[62rem] h-full"
                                                        style={{ width: `${(count / totalCharacter) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div
                                                    className="w-[30%] text-[1rem] text-end">{count} ({(count / totalCharacter * 100).toFixed(2)}%)
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                            <button className="flex items-center gap-2" onClick={() => setShowAll(!showAll)}>
                                {showAll ? "Show less" : 'Show more'}
                                <svg
                                    width="12"
                                    height="7"
                                    viewBox="0 0 12 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={showAll ? 'rotate-180' : ''}
                                >
                                    <path
                                        d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z"
                                        fill="#12131A"
                                    />
                                </svg>
                            </button>
                        </>)
                        :
                        <p className="text-[#404254] font-[400]">No characters found. Start typing to see letter density.</p>
                    }
                </div>
            </main >
        </div >
    )
}

export default CharacterCounterPage;