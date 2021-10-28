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
    let emptyCells = []
    let emptyCellNums = []
    
    const getInputs = () => {
        let inputKeeper = 1
        let inputArray = []
        for(let i = 0;i<80;i++){
            inputArray.push(document.getElementById(`input${inputKeeper}`).value)
            inputKeeper += 1
        }
        return inputArray
    }

    const inputs = getInputs()

    let rows = [
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
    let cols = [
        [5,6,0,8,4,7,0,0,0],
        [3,0,9,0,0,0,6,0,0],
        [0,0,8,0,0,0,0,0,0],
        [0,1,0,0,8,0,0,4,0],
        [7,9,0,6,0,2,0,1,8],
        [0,5,0,0,3,0,0,9,0],
        [0,0,0,0,0,0,2,0,0],
        [0,0,6,0,0,0,8,0,7],
        [0,0,0,3,1,6,0,5,9]
    ]
    let boxes = [
        [5,3,0,6,0,0,0,9,8],
        [0,7,0,1,9,5,0,0,0],
        [0,0,0,0,0,0,0,6,0],
        [8,0,0,4,0,0,7,0,0],
        [0,6,0,8,0,3,0,2,0],
        [0,0,3,0,0,1,0,0,6],
        [0,6,0,0,0,0,0,0,0],
        [0,0,0,4,1,9,0,8,0],
        [2,8,0,0,0,5,0,7,9]
    ]
    document.getElementById('form').style.display = 'none'
    document.getElementById('unsolved').style.display = 'none'
    document.getElementById('solved').style.display = 'flex'
    document.getElementById('solvedBoard').style.display = 'flex'

    function cell(rows,cols,boxes,pos) {
        this.rows = rows
        this.cols = cols
        this.boxes = boxes
        this.pos = pos
    }
 
    const runProgram = () => {
        for(let i = 0;i<9;i++){
            for(let j = 0;j<9;j++){
                if(rows[i][j] == 0){

                    let box = getBox(i,j)

                    let cell0 = new cell(rows[i],cols[j],boxes[box[0]+box[1]],[i,j])
                    emptyCells.push(cell0)
                }
            }
        }
    }
    
    const getEmptyCellNums = () => {
        let arrayOfNums = []
        let counter = 0
        let missingNum = 0
        for(let i = 0;i<emptyCells.length;i++){
            for(let j = 0;j<9;j++) {
                if(emptyCells[i].rows[j] != 0){
                    arrayOfNums.push(emptyCells[i].rows[j])
                }
                if(emptyCells[i].cols[j] != 0){
                    arrayOfNums.push(emptyCells[i].cols[j])
                }
                if(emptyCells[i].boxes[j] != 0){
                    arrayOfNums.push(emptyCells[i].boxes[j])
                }
            }
            emptyCellNums.push(arrayOfNums)
            arrayOfNums = []
        }
    }

    const getBox = (i,j) => {
        let boxX = Math.floor(i/3)
        let boxY = Math.floor(j/3)
        switch (boxX) {
            case (0):
                break
            case (1):
                boxX +=2
                break
            case (2):
                boxX +=4
                break
            default:
                break
        }
        let boxI = i%3
        let boxJ = j%3
        switch (boxI) {
            case (0):
                break
            case (1):
                 boxI+=2
                break
            case (2):
                boxI +=4
                break
            default:
                break
        }
        return [boxX,boxY,boxI,boxJ]
    }

    const reverseEmptyCells = () => { 
        for(let i = 0;i<emptyCellNums.length;i++){
            emptyCellNums[i] = notIncluded(emptyCellNums[i])
        }
    }
    const notIncluded = (array) => {
        const words = [1,2,3,4,5,6,7,8,9]
        const arrayX = []
        for(let i = 0;i<words.length;i++){
          if(array.includes(words[i]) != true){
              arrayX.push(words[i])
          }
        }
        return arrayX
    }

    const enterUniqueSolutions = () => {
        for(let i = 0;i<emptyCellNums.length;i++){
            if(emptyCellNums[i].length == 1){
                rows[emptyCells[i].pos[0]][emptyCells[i].pos[1]] = emptyCellNums[i][0]
                cols[emptyCells[i].pos[1]][emptyCells[i].pos[0]] = emptyCellNums[i][0]
                let box = getBox(emptyCells[i].pos[0],emptyCells[i].pos[1])
                boxes[box[0]+box[1]][box[2]+box[3]] = emptyCellNums[i][0]
            }
        }
    }

    const solve = () => {
        while(true){
            runProgram()
            getEmptyCellNums()
            reverseEmptyCells()
            enterUniqueSolutions()
            console.log(emptyCellNums)
            console.log(rows)
            console.log(cols)
            console.log(boxes)
            if(emptyCells.length < 1){
                break
            }
            emptyCells = []
            emptyCellNums = []
        }
    }

    const printBoard = () => {
        let solvedPlace = 1
        for(let i = 0;i<9;i++){
            for(let j = 0;j<9;j++){
                document.getElementById(`solved${solvedPlace}`).innerText = rows[i][j]
                solvedPlace += 1
            }
        }
    }

    solve()
    printBoard()
    
    console.log(inputs)


})
