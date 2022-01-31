const keywordRegex = /\$((?:\()[\s\S]+?(?:\))|(\S+?))(?=[\s",;.\n\t|*+:])/gim

export const manipulateKeyword = (keyword: string): string => {
    return keyword.slice(1).replace(')','').replace('(','')
}

export const getKeywords = (text: string):string[] => {
    const results = text.match(keywordRegex);

    if(!results) return []
    const arr = results.map((result) => manipulateKeyword(result));

    // @ts-ignore
    return [...new Set(arr)]
}

export const replaceKeywordsWithLinks = (text:string): string =>  {
    return text.replaceAll(keywordRegex,(match) => {
        const keyword = manipulateKeyword(match)
        return `**${keyword}**`
    })
}