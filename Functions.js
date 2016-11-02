
//function1 for sumofsquares
function sumOfSquares(num1,num2,num3){
    try{
        for(let i=0; i<arguments.callee.length; i++){
            if(typeof(arguments[i]) !== 'number')
                throw "please enter valid number of inputs of number type"; 
        }
     
        return [Math.pow(num1,2),Math.pow(num2,2),Math.pow(num3,2)].reduce((a,b)=>a+b, 0);
    }catch(e){
        console.log(e);
     }
}

console.log('sum of sqaures of 3 numbers is %d',sumOfSquares(5,3,10));

//function 2 for sayhelloto
function sayHelloTo(firstName,lastName,title){
    
   try{
        for(let i=0; i<arguments.length; i++){
            if(typeof(arguments[i]) !== 'string')
                throw "E0";
        }
        if((arguments.length === 0 )|| (arguments.length >= 4))
            throw "E1";
        if(arguments.length === 1)
            console.log('Hello, %s!',arguments[0]);
        if(arguments.length === 2)
            console.log('Hello, %s %s.I hope you are having a good day!',arguments[0],arguments[1]);
        if(arguments.length === 3)
            console.log('Hello, %s %s %s! Have a good evening!',arguments[2],arguments[0],arguments[1]);    
   }catch(e) {
        if(e === "E0")
        console.log('Non string input passed to sayhelloto function');
        if(e === "E1")
        console.log('please give sufficient of upto 3 inputs for sayhelloto function');
   }

}

sayHelloTo();
sayHelloTo("Phil");
sayHelloTo("Phil", "Barresi");
sayHelloTo("Phil", "Barresi", "Mr.");
     

//function 3

function cupsOfCoffee(howManyCups){
    try{
        if(arguments.length != 1)
            throw "Number of inputs should be only 1";
        if(typeof(howManyCups) !== 'number')
            throw "Non number input passed to cupsofcoffee function";
        
        if((Number.isInteger(howManyCups) != true) || (howManyCups === 0))
            throw "Input is not whole number";
        if((Math.sign(howManyCups) === -1) || (Math.sign(howManyCups) === -0))
            throw "Input is negative number";
        var str4='';
        for(let i=howManyCups;i>0;i--){
            var str1="cups of coffee on the desk! " ;
            var str2="cups of coffee! ";
            var str3="Pick one up, drink the cup, ";
            var strcup2="cup of coffee on the desk! ";
            var strcup1="cup of coffee! ";
            var strcup="no more coffee left on the desk! ";
            var strcon = "Pick it up, drink the cup, ";
          //  var str4="cups of coffee on the desk!";
            if(i === 2){
                var str4=str4+i+' '+str1+i+' '+str2+'\n'+str3+(i-1)+' '+strcup2+'\n'+'\n';
                continue;
            }
            if (i === 1){
                var str4 = str4+i+' '+strcup2+i+' '+strcup1+'\n'+strcon+strcup+'\n'+'\n';
                continue;
            }
        
            str4 = str4+i+' '+str1+i+' '+str2+'\n'+str3+(i-1)+' '+str1+'\n'+'\n';
        
        }   
        return str4
    } catch(e){
        console.log(e);
     }
}

console.log(cupsOfCoffee(5));

//function 4

function occurrencesOfSubstring(fullString,substring){
   try{
        let str1 = fullString;
        let str2 = substring;

 
       if((typeof(str1) !== 'string' ) || (typeof(str2) !== 'string'))
           throw "E3";    
    
        let freq=0;
    
        var pos=str1.indexOf(str2);
        while(pos !== -1){
            freq++;
            str1 = str1.slice(pos+1);
            pos= str1.indexOf(str2);
        }
        return freq;
    }catch (e){
       if(e === "E3")
       console.log("Insufficient number of inputs or invalid type of inputs for countOccurrencesOfSubstring function");
   }
}

console.log(occurrencesOfSubstring("hello world", "o"));
console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));

//function 5

function randomizeSentences(paragraph){
    try{
        if(arguments.length != 1)
            throw "please enter correct number of inputs for randomizesentences fucntion";
        
        if(typeof(paragraph) !== 'string')
            throw "Non string input passed to randomizeSentences function "
    
        paragraph=paragraph.replace(/([!.?]+)/g,"$1\'");   
        let newstr = paragraph.split('\'').filter(function(x) {return x != ''});
        for(let k = newstr.length-1; k>0; k--){
            let l=Math.floor(Math.random()*(k+1));
            let tmpstr = newstr[k];
            newstr[k]=newstr[l];
            newstr[l]=tmpstr;
        }
        return newstr.join('');
    }catch(e){
        console.log(e);
     }
}


var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences(paragraph));

