// take in Array for 4x4
// begin to fill in numbers for first missing array elements
// generate random number after checking numbers in rows and columns as well as box to narrow down possiblities
// test rows, columns, and boxes
// if correct move forward to next missing element

const submitBnt = document.getElementById('submit')
document.getElementById('solved').style.display = 'none'
document.getElementById('solvedBoard').style.display = 'none'


form.addEventListener('submit', (e)=> {

    e.preventDefault()
    var currentPos = []
    var takenNums = []
    var boradSolved = true

    var rows = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ]

    document.getElementById('form').style.display = 'none'
    document.getElementById('unsolved').style.display = 'none'
    
    
    // function that looks for empty cell
    // then saved empty location in var currentRow and currentCol
    const lookForEmptyCell = () => {
        console.log('looking for empty cell')  
        for (let i = 0;i<rows.length;i++) {
            for(let j = 0;j<rows[i].length;j++){
                if(rows[i][j] == ''){
                    console.log('found empty cell')
                    currentPos.push(i)
                    currentPos.push(j)
                    console.log(currentRow,currentCol)
                    return
                }
            }
        }
        boradSolved = false
    }


    // function that narrows down what numbers can fit in the current spot
    // used to speed up program
    const getUsedNums = () => {
        console.log('getting Used Nums')

            var rowNums = rows[currentRow].filter(isNotEmpty)
            rowNums.forEach(rowNums => takenNums.push(rowNums))

            var colNums = cols[currentCol].filter(isNotEmpty)
            colNums.forEach(colNums => takenNums.push(colNums))

            // get numbers in same box
            
    }

    function isNotEmpty(value) {
        return value !== ''
    }

    const getNewNum = () => {
        console.log('getting new num')
        console.log(takenNums)
            for(let i = 0;i<50;i++) {
            var newNum = Math.floor(Math.random()*5)
                if(takenNums.includes(`${newNum}`) || newNum == 0){
                } else {
                    console.log('adding num to array')
                    console.log(newNum)
                    console.log(currentRow,currentCol)
                    rows[currentRow][currentCol] = `${newNum}`
                    cols[currentCol][currentRow] = `${newNum}`
                    break
                }
            } 
    }

    const solveBoard = () => {
            while(boradSolved){
                lookForEmptyCell()
                getUsedNums()
                getNewNum()
                takenNums = []
                console.log(rows)
                console.log(cols)
        }
    }

    

    document.getElementById('solved').style.display = 'flex'
    document.getElementById('solvedBoard').style.display = 'flex'
})
