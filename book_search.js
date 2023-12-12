/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var hits = [];

    scannedTextObj.forEach((book) => {
        isbn = book["ISBN"]

        /*
        // sort the lines of the book. This is important for processing dangling search terms
        book["Content"].sort((a, b) => {
            if(a["Page"] == b["Page"]) {
                a["Line"] - b["Line"];
            } else {
                a["Page"] - b["Page"];
            }
        })
        
        prefix = "";
        prevPage = 0;
        prevLine = 0;
        fPage = 0;
        fLine = 0;
        */

        for(i = 0; i < book["Content"].length; i++) {
            // Simple Method
            if(book["Content"][i]["Text"].search(searchTerm) != -1) { 
                hits.push({
                    "ISBN": isbn,
                    "Page": book["Content"][i]["Page"],
                    "Line": book["Content"][i]["Line"]
                })
            }
            /* Incomplete Complex Method
            termloc = book["Content"][i]["Text"].search(searchTerm);
            if(book["Content"][i]["Page"] == prevPage && book["Content"][i]["Line"] == prevLine + 1 || 
            book["Content"][i]["Page"] == prevPage + 1 && book["Content"][i]["Line"] == 1) { // same sequence
                if(termloc != -1) { // whole term was found on this line
                    hits.push({
                        "ISBN": isbn,
                        "Page": book["Content"][i]["Page"],
                        "Line": book["Content"][i]["Line"]
                    });

                    if((prefix + book["Content"][i]["Text"].substring(0, termloc)).search(searchTerm) != -1) { //completes a dangle
                        hits.push({
                            "ISBN": isbn,
                            "Page": fPage,
                            "Line": fLine
                        });
                    }
                    prefix = "";
                    prevPage = 0;
                    prevLine = 0;
                    fPage = 0;
                    fLine = 0;

                } else {
                    
                }
            } else if(!hit){ //new sequence (only matters if no hit)
                fPage = book["Content"][i]["Page"];
                fLine = book["Content"][i]["Line"];
            }
            prevPage = book["Content"][i]["Page"];
            prevLine = book["Content"][i]["Line"];
            */
        }
    })

    var result = {
        "SearchTerm": searchTerm,
        "Results": hits
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const emptyOut = {
    "SearchTerm": "nope",
    "Results": []
}

const multipleBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "test",
        "ISBN": "001",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "This line says \"now.\""
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "This line does not"
            }
        ] 
    }
]

const multipleBooksOut = {
    "SearchTerm": "now",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "001",
            "Page": 1,
            "Line": 1
        }
    ]
}

const emptyBook = [
    {
        "Title": "Empty Book",
        "ISBN": "0",
        "Content": [] 
        
    }
]

const danglingOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
    ]
}



/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* negative result */
const test3result = findSearchTermInBooks("nope", twentyLeaguesIn);
if (JSON.stringify(emptyOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", emptyOut);
    console.log("Received:", test3result);
}

/* multiple books */
const test4result = findSearchTermInBooks("now", multipleBooksIn);
if (JSON.stringify(multipleBooksOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", emptyOut);
    console.log("Received:", test4result);
}

/* no books */
const test5result = findSearchTermInBooks("nope", []);
if (JSON.stringify(emptyOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", emptyOut);
    console.log("Received:", test5result);
}

/* empty book */
const test6result = findSearchTermInBooks("nope", emptyBook);
if (JSON.stringify(emptyOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", emptyOut);
    console.log("Received:", test6result);
}

/* dangling word */
/*
const test7result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(danglingOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", danglingOut);
    console.log("Received:", test7result);
}
*/
/* dangling word scrambled */

/* dangle and hit */

/* dangling word across pages */

/* fake dangling word */

/* fake dangling word across pages */

/* term longer than line */

/* fake term longer than line */
