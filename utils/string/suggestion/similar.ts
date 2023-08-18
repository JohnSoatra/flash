import stringSimilarity from 'string-similarity';
import { Suggestion } from '@/typings';
  
function score(
    keyword: string,
    sentence: string
) {
    return stringSimilarity.compareTwoStrings(keyword, sentence);
}
  
function similarSuggestions(
    keyword: string,
    suggestions: Suggestion[],
    take?: number,
    flow = 'desc'
) {
    const filtered = suggestions.filter((suggestion, index) => {
        for (let i = 0; i < index; i ++) {
            if (suggestion.title === suggestions[i].title) {
                return false;
            }
        }

        return true;
    });

    const sliced = filtered.slice(0, take);

    const sorted = sliced.sort((after, before) => {
        const scoreAfter = score(keyword, after.title);
        const scoreBefore = score(keyword, before.title);
        const result = scoreAfter - scoreBefore;
  
        return flow === 'asc' ? result : -result;
    });

    if (suggestions.length && Object.keys(suggestions[0]).includes('searched')) {
        let searched = sorted.filter(suggestion => suggestion.searched);
        let notSearched = sorted.filter(suggestion => !suggestion.searched);
    
        return [ ...searched, ...notSearched ];
    }
    
    return sorted;
}

export default similarSuggestions;