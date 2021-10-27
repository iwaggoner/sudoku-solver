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
                    console.log(currentPos)
                    return
                }
            }
        }
        return true
    }



    // has to pass num from getNewNum, board, and current position
    // then test the row position gives
    // then tests col position is in
    // then test box based on postion
    // if passes all test returns true
    // if fails any test returns false
    const correctBoard = (board, num, currentPos) => {

        // checks all rows
        for(let i = 0;i<board[0].length;i++){
            if(board[currentPos[0]][i] == num){
                console.log('found false in row')
                return false
            }
        }
        // checks all cols
        for(let i = 0;i<board[0].length;i++){
            if(board[i][currentPos[1]] == num){
                console.log('found false in col')
                return false
            }
        }
        var startX = Math.floor(currentPos[0]/3)
        var startY = Math.floor(currentPos[1]/3)
            // set up double loop to collect each non 0 element in postion box
            for(let i = 0;i<startX+3;i++){
                for(let j = 0;j<startY+3;j++){
                    if(board[i][j] == num){
                        console.log('found false in box')
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

    // takes in board and postion, then trys to inscert numbers 1-9 into position
    // once correct board comes back true it sets that number into that location and breaks loop ends function
    const getNewNum = (board, pos) => {
        console.log('getting new num')
            for(let i = 1;i<10;i++){
                if(correctBoard(board, i, pos)){
                    console.log('adding num to array after test for correct was true')
                    console.log(i)
                    board[pos[0]][pos[1]] = i
                    if(test(board)) {
                        console.log('running test again')
                        return true
                    }
                }
                else {
                    board[pos[0]][pos[1]] = 0
                    console.log('correctBoard was false for', i)
                    console.log('setting',pos,'to 0')
                }
            }
            
    } 
    


    const test = (board) => {
        currentPos = []
        if(lookForEmptyCell(board)){
            console.log('look for empty cell came back true, Board is solved')
            return true
        }
        getNewNum(board,currentPos)
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
