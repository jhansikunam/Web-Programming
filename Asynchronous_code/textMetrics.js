let metrics = exports = module.exports;

metrics.createMetrics = (text) => {
    
    if(text === undefined || typeof(text) !== 'string'){
        console.log(text);
        throw "Non string input passed to createMetrics function ";
    }
    
    let id=0;
    let totalLetters=0;
    let count = 0;
    let longwords = 0;
    let wordoccurences = {};
    let metrics = {};
    
    text=text.toLowerCase();   
    let newstr = text.replace(/([!.?,\"\;\-\(\)\[\]:=]+)/g," ").replace(/\s*\'\s+/g," ").replace(/([\'])/g,"").split(/\s+/).filter(function(x) {return x != ''});
    let totalwords = newstr.length;
    
    metrics['totalWords']=totalwords;

    for(let i=0;i<newstr.length;i++){
        totalLetters+=newstr[i].length;
    }
    metrics['totalLetters']=totalLetters;

    newstr.forEach(function(word){
        if(word.length>6)
            longwords++;
        if(!wordoccurences[word]){
            wordoccurences[word]=1;
            count++;
        }
        else
            wordoccurences[word]=wordoccurences[word]+1;
    })
    metrics['uniqueWords'] = count;
    let averagewordlength = totalLetters/(newstr.length);
    metrics['longWords']=longwords;
    metrics['averageWordLength']=averagewordlength.toFixed(2);
    text = text.replace(/([mr,mrs,dr])\.\s+/g,"$1")
    text = text.replace(/[,\"\;\-\(\)\[\]:=]+\s+/g," ").replace(/\s*\'\s+/g," ")
    let no_of_sentences = text.split(/[!.?]+\s+/g).length;
    metrics['numberOfSentences']=no_of_sentences;
    let textcomplexity = totalwords/no_of_sentences + (longwords * 100)/totalwords;
    metrics['textComplexity']=textcomplexity.toFixed(2);
    metrics['wordOccurrences']=wordoccurences;
    return metrics;
}