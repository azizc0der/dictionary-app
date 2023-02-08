import React, { useEffect, useState } from 'react'
import { countryCodes } from '../data/country-code'
import Alert from '../images/alert.png'
import Search from '../images/search.svg'
import Theme from './theme'
import NotFound from '../images/not-found.png'

const Dictionary = () => {
  const [inputValue, setInputValue] = useState('')
  const [wordMeanings, setWordMeanings] = useState([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      makeApiCall(inputValue)
    }, 10)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [inputValue])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const makeApiCall = (value) => {
    if (value) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
        .then((response) => response.json())
        .then((data) => {
          setWordMeanings(data)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <div className="py-4 w-[100%] pt-[20px] relative">
          <input
            type="search"
            placeholder="Search any word"
            autoComplete="off"
            spellCheck="true"
            className="w-[100%] sm:w-[90%] text-[.85rem] pt-[1em] pr-[.5em] pb-[1em] pl-[3.1em] rounded-[10px] bg-[#f1f1f1] outline-none caret-[red] font-[500] text-[#000]"
            onChange={handleInputChange}
          />
          <img
            src={Search}
            alt="Search"
            className="absolute top-[25%] left-[15px] transform-y-[50%] translate-y-[50%] w-6 h-6"
          />
        </div>
        <Theme />
      </div>
      <>
        {wordMeanings.length > 0 ? (
          <div className="flex flex-col gap-[20px] rounded-[10px] mt-[20px]">
            {wordMeanings?.map((wordMeaning, wordIndex) => {
              const { word, meanings, phonetic, phonetics } = wordMeaning
              let id = wordIndex + 1
              return (
                <article
                  key={wordIndex}
                  className="py-[30px] relative border-b-2 border-dashed"
                >
                  <h1 className="absolute top-0">
                    {wordIndex + 1}
                    <sup>
                      {id === 1 ? (
                        <sup>st</sup>
                      ) : id === 2 ? (
                        <sup>nd</sup>
                      ) : id === 3 ? (
                        <sup>rd</sup>
                      ) : (
                        <sup>th</sup>
                      )}
                    </sup>{' '}
                  </h1>
                  <div className="sm:flex sm:flex-row items-center sm:justify-between">
                    <div>
                      <h2 className="text-[2rem] font-[700]">{word}</h2>
                      <p>{phonetic}</p>
                    </div>
                    <div className="mt-[20px] sm:mt-[0]">
                      {phonetics.map((phonetic, phoneticIndex) => {
                        const { audio } = phonetic
                        return (
                          <div
                            className="flex items-end gap-[10px] mb-[10px]"
                            key={phoneticIndex}
                          >
                            {audio && (
                              <>
                                {countryCodes.map(
                                  (countryCode, countryCodeIndex) => {
                                    if (
                                      audio ===
                                      `https://api.dictionaryapi.dev/media/pronunciations/en/${inputValue}-${countryCode.toLowerCase()}.mp3`
                                    ) {
                                      return (
                                        <em key={countryCodeIndex}>
                                          {countryCode.toLowerCase()}
                                        </em>
                                      )
                                    }
                                  },
                                )}
                                <audio src={audio} controls />
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px] mt-[30px]">
                    {meanings.map((meaning, meaningIndex) => {
                      const {
                        partOfSpeech,
                        antonyms,
                        synonyms,
                        definitions,
                      } = meaning

                      return (
                        <div key={meaningIndex}>
                          <div>
                            <img className="w-[70px]" src={Alert} alt="Alert" />
                            <span className="font-LuxuriousRoman px-[18px] py-[4px] bg-[#36a9d3] rounded-[30px] text-[white]">
                              Part of Speech
                            </span>
                            <div className="px-[15px] py-[5px]">
                              <em className="text-[red]">{word}: </em>
                              <em className="text-[grey]">{partOfSpeech}</em>
                            </div>
                          </div>
                          <div className="mt-[20px]">
                            {definitions.length > 0 && (
                              <div>
                                <span className="font-LuxuriousRoman px-[18px] py-[4px] bg-[#36a9d3] rounded-[30px] text-[white]">
                                  Definitions
                                </span>
                                <ul className="px-[30px] py-[5px]">
                                  {definitions.map(
                                    (definitionItem, definitionIndex) => {
                                      const {
                                        definition,
                                        example,
                                      } = definitionItem

                                      return (
                                        <li
                                          className="list-disc"
                                          key={definitionIndex}
                                        >
                                          {definition && definition} <br />
                                          <div>
                                            {example && (
                                              <>
                                                <span className="text-[red]">
                                                  Example:
                                                </span>{' '}
                                                <em className="underline decoration-sky-500 text-[#36a9d3]">
                                                  {example}
                                                </em>
                                              </>
                                            )}
                                          </div>
                                        </li>
                                      )
                                    },
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-[10px] mt-[20px]">
                            {synonyms.length > 0 && (
                              <div>
                                <span className="font-LuxuriousRoman px-[18px] py-[4px] bg-[#36a9d3] rounded-[30px] text-[white]">
                                  Synonyms
                                </span>
                                <div className="px-[15px] my-[15px] flex flex-wrap gap-[10px]">
                                  {synonyms.map((synonym, synonymIndex) => {
                                    return (
                                      <p
                                        key={synonymIndex}
                                        className="bg-[#e5e5e5] px-[10px] py-[3px] rounded-[10px] text-[#000]"
                                      >
                                        {synonym}
                                      </p>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-[10px] mt-[20px]">
                            {antonyms.length > 0 && (
                              <div>
                                <span className="font-LuxuriousRoman px-[18px] py-[4px] bg-[#36a9d3] rounded-[30px] text-[white]">
                                  Antonyms
                                </span>
                                <div className="px-[15px] my-[15px] flex flex-wrap gap-[10px]">
                                  {antonyms.map((antonym, antonymIndex) => {
                                    return (
                                      <p
                                        key={antonymIndex}
                                        className="bg-[#e5e5e5] px-[10px] py-[3px] rounded-[10px] text-[#000]"
                                      >
                                        {antonym}
                                      </p>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <img
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            src={NotFound}
            alt="NotFound"
          />
        )}
      </>
    </div>
  )
}

export default Dictionary
5
