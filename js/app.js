// take in Array for 9x9
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

    var board = [
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
    

    // function that is passed the board and looks for empty cell
    // Once it finds a empty cell it saves the location in currentPos array  [row, col]
    const lookForEmptyCell = (board) => {
        console.log('looking for empty cell')  
        for (let i = 0;i<board[0].length;i++) {
            for(let j = 0;j<board[0].length;j++){
                if(board[i][j] == 0){
                    console.log('found empty cell')
                    currentPos.push(i)
                    currentPos.push(j)
                    return
                }
            }
        }
    }


    // // function that narrows down what numbers can fit in the current spot
    // // used to speed up program
    // // will use very similar function to check if numbers are correct
    // const getUsedNums = (board, currentPos) => {
    //     console.log('getting Used Nums')

    //         // save all non 0 numbers in the same row as empty cell to an array
    //         var rowNums = board[currentPos[0]].filter(isNotEmpty)
    //         rowNums.forEach(rowNums => takenNums.push(rowNums))
    //         console.log(takenNums)

    //         // save all non 0 numbers in the same col as empty cell to any array
    //         for(let i = 0;i<board[0].length;i++){
    //             if(board[i][currentPos[1]] != 0){
    //                 takenNums.push(board[i][currentPos[1]])
    //             }
    //         }
    //         console.log(takenNums)

    //         // get numbers in same box based on empty cell
    //         // can divide each position by 3 and then round down to find starting point of box
    //         var startX = Math.floor(currentPos[0]/3)
    //         var startY = Math.floor(currentPos[1]/3)
    //         // set up double loop to collect each non 0 element in postion box
    //         for(let i = 0;i<startX+3;i++){
    //             for(let j = 0;j<startY+3;j++){
    //                 if(board[i][j] != 0){
    //                     takenNums.push(board[i][j])
    //                 } 
    //             }
    //         }
    //         console.log(takenNums)
    // }

    // almost the same function as getUsedNums but check if number generated is good num
    // has to pass num, board, and current position
    // if good it returns true and num is entered into board
    const correctBoard = (board, num, currentPos) => {

        // checks all rows
        for(let i = 0;i<board[0].length;i++){
            if(board[i][currentPos[1]] == num){
                return false
            }
        }
        // checks all cols
        for(let i = 0;i<board[0].length;i++){
            if(board[i][currentPos[1]] == num){
                return false
            }
        }
        var startX = Math.floor(currentPos[0]/3)
        var startY = Math.floor(currentPos[1]/3)
            // set up double loop to collect each non 0 element in postion box
            for(let i = 0;i<startX+3;i++){
                for(let j = 0;j<startY+3;j++){
                    if(board[i][j] == num){
                        return false
                    } 
                }
            }
        return true
    }
    // used equation to filter out all values that are not 0
    function isNotEmpty(value) {
        return value !== 0
    }

    // used array takenNums to narrow down what the program can select and test if okay number to use
    const getNewNum = (board, pos) => {
        console.log('getting new num')
            for(let i = 1;i<10;i++){
                if(correctBoard(board, i, pos)){
                    console.log('adding num to array after testing if correct')
                    console.log(i)
                    board[pos[0]][pos[1]] = i
                    break
                }
                board[pos[0]][pos[1]] = 0
            }
    } 
    


    const test = (board) => {

        for(let i = 0;i<10;i++){
            lookForEmptyCell(board)
            console.log(currentPos)
            getNewNum(board,currentPos)
            console.log(board)
            takenNums = []
            currentPos = []
        }
    }

    // print out solved board
    // also help debug
    // is much better as for loop rather than 81 lines of code
    const setBoard = (board) => {
        var inputSelector = 1
        for(let i = 0;i<board[0].length;i++){
            for(let j = 0;j<board[0].length;j++){
                document.getElementById(`solved${inputSelector}`).textContent = board[i][j]
                inputSelector += 1
            }
        }
    }
    
    test(board)
    setBoard(board)

    document.getElementById('solved').style.display = 'flex'
    document.getElementById('solvedBoard').style.display = 'flex'
})
