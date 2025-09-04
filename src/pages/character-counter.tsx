import { cn, tw } from "@/libs/cn";
import { useEffect, useState } from "react";

export const CharacterCounterPage = () => {
    const cardStyle = tw("p-[1.25rem] flex flex-col gap-2 rounded-[0.75rem] text-[#12131A]");
    const [currentText, setCurrentText] = useState("");
    const [totalCharacter, setTotalCharacter] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [excludeSpace, setExcludeSpace] = useState<boolean>(false);
    const [charFrequency, setCharFrequency] = useState<Map<string, number>>(new Map());

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentText(event.target.value);
    }

    useEffect(() => {
        if (!excludeSpace) {
            setTotalCharacter(currentText.length);
        }
        else {
            let count = 0;
            for (let i = 0; i < currentText.length; ++i) {
                count += currentText[i] !== ' ' ? 1 : 0;
            }
            setTotalCharacter(count);
        }
        setWordCount(currentText.split(' ').filter(item => item != '').length);
        setSentenceCount(currentText.split('.').filter(item => item.trim() != '').length);
        const freq = new Map();
        for (const ch of currentText) {
            freq.set(ch.toUpperCase(), (freq.get(ch.toUpperCase()) || 0) + 1);
        }
        setCharFrequency(freq);
    }, [currentText, excludeSpace]);

    return (
        <div className="px-4 pt-4 pb-8 min-h-screen font-DMSans flex flex-col gap-10 bg-[#fff]">
            <header className="flex justify-between items-center p-4">
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
                    w-full min-h-[12.5rem]"
                    placeholder="Type your text here..."
                    value={currentText}
                    onChange={onChange}
                >
                </textarea>
                {/* options */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="Exclude-Spaces-Character-Counter" onChange={(event) => {
                                setExcludeSpace(event.currentTarget.checked);
                            }} />
                            <label htmlFor="Exclude-Spaces-Character-Counter">Exclude Spaces</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="Set-Character-Limit-Character-Counter" />
                            <label htmlFor="Set-Character-Limit-Character-Counter">Set Character Limit</label>
                        </div>
                    </div>
                    <div>Approx. reading time: {'<'}1 minute</div>
                </div>
            </div>
            {/* main-content  */}
            <main>
                {/* statics */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className={cn(cardStyle, 'bg-[#D3A0FA]')}>
                        <div className="font-[700] text-[2.5rem]">{totalCharacter}</div>
                        <div className="text-[1.25rem] font-[400]">Total Characters</div>
                    </div>

                    <div className={cn(cardStyle, 'bg-[#FF9F00]')}>
                        <div className="font-[700] text-[2.5rem]">{wordCount}</div>
                        <div className="text-[1.25rem] font-[400]">Word Count</div>
                    </div>

                    <div className={cn(cardStyle, 'bg-[#FE8159]')}>
                        <div className="font-[700] text-[2.5rem]">{sentenceCount}</div>
                        <div className="text-[1.25rem] font-[400]">Sentence Count</div>
                    </div>
                </div>

                {/* letter density  */}
                <div className="flex flex-col gap-5">
                    <h1 className="text-[1.5rem] font-[600]">Letter Density</h1>
                    <div className="flex flex-col gap-4">
                        {
                            [...charFrequency.entries()].map(([char, count]) => (
                                <div key={char} className="flex gap-4 h-[0.725rem] items-center">
                                    <div className="w-1">{char}</div>
                                    <div className="flex-1 bg-[#F2F2F7] rounded-[63rem] h-full">
                                        <div
                                            className="bg-[#D3A0FA] rounded-[62rem] h-full"
                                            style={{ width: `${(count / totalCharacter) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-[30%] text-[1rem] text-end">{count} ({(count / totalCharacter * 100).toFixed(2)}%)</div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="flex items-center gap-2">See more
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="#12131A" />
                        </svg>
                    </button>

                </div>
            </main >
        </div >
    )
}

export default CharacterCounterPage;