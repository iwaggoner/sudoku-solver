// take in Array for 9x9
// begin to fill in numbers for first missing array elements
// generate random number after checking numbers in rows and columns as well as box to narrow down possiblities
// test rows, columns, and boxes
// if correct move forward to next missing element

const resetButton = document.getElementById('reset')
document.getElementById('solved').style.display = 'none'
document.getElementById('solvedBoard').style.display = 'none'


form.addEventListener('submit', (e)=> {

    e.preventDefault()
    let emptyCells = []
    let emptyCellNums = []
    
    const getInputs = () => {
        let inputKeeper = 1
        let inputArray = []
        for(let i = 0;i<81;i++){
            inputArray.push(document.getElementById(`input${inputKeeper}`).value)
            inputKeeper += 1
        }
        return inputArray
    }

    const inputs = getInputs()

    let rows = [
        [inputs[0],inputs[1],inputs[2],inputs[3],inputs[4],inputs[5],inputs[6],inputs[7],inputs[8]],
        [inputs[9],inputs[10],inputs[11],inputs[12],inputs[13],inputs[14],inputs[15],inputs[16],inputs[17]],
        [inputs[18],inputs[19],inputs[20],inputs[21],inputs[22],inputs[23],inputs[24],inputs[25],inputs[26]],
        [inputs[27],inputs[28],inputs[29],inputs[30],inputs[31],inputs[32],inputs[33],inputs[34],inputs[35]],
        [inputs[36],inputs[37],inputs[38],inputs[39],inputs[40],inputs[41],inputs[42],inputs[43],inputs[44]],
        [inputs[45],inputs[46],inputs[47],inputs[48],inputs[49],inputs[50],inputs[51],inputs[52],inputs[53]],
        [inputs[54],inputs[55],inputs[56],inputs[57],inputs[58],inputs[59],inputs[60],inputs[61],inputs[62]],
        [inputs[63],inputs[64],inputs[65],inputs[66],inputs[67],inputs[68],inputs[69],inputs[70],inputs[71]],
        [inputs[72],inputs[73],inputs[74],inputs[75],inputs[76],inputs[77],inputs[78],inputs[79],inputs[80]],
    ] 
    let cols = [
        [inputs[0],inputs[9],inputs[18],inputs[27],inputs[36],inputs[45],inputs[54],inputs[63],inputs[72]],
        [inputs[1],inputs[10],inputs[19],inputs[28],inputs[37],inputs[46],inputs[55],inputs[64],inputs[73]],
        [inputs[2],inputs[11],inputs[20],inputs[29],inputs[38],inputs[47],inputs[56],inputs[65],inputs[74]],
        [inputs[3],inputs[12],inputs[21],inputs[30],inputs[39],inputs[48],inputs[57],inputs[66],inputs[75]],
        [inputs[4],inputs[13],inputs[22],inputs[31],inputs[40],inputs[49],inputs[58],inputs[67],inputs[76]],
        [inputs[5],inputs[14],inputs[23],inputs[32],inputs[41],inputs[50],inputs[59],inputs[68],inputs[77]],
        [inputs[6],inputs[15],inputs[24],inputs[33],inputs[42],inputs[51],inputs[60],inputs[69],inputs[78]],
        [inputs[7],inputs[16],inputs[25],inputs[34],inputs[43],inputs[52],inputs[61],inputs[70],inputs[79]],
        [inputs[8],inputs[17],inputs[26],inputs[35],inputs[44],inputs[53],inputs[62],inputs[71],inputs[80]]
    ]
    let boxes = [
        [inputs[0],inputs[1],inputs[2],inputs[9],inputs[10],inputs[11],inputs[18],inputs[19],inputs[20]],
        [inputs[3],inputs[4],inputs[5],inputs[12],inputs[13],inputs[14],inputs[21],inputs[22],inputs[23]],
        [inputs[6],inputs[7],inputs[8],inputs[15],inputs[16],inputs[17],inputs[24],inputs[25],inputs[26]],
        [inputs[27],inputs[28],inputs[29],inputs[36],inputs[37],inputs[38],inputs[45],inputs[46],inputs[47]],
        [inputs[30],inputs[31],inputs[32],inputs[39],inputs[40],inputs[41],inputs[48],inputs[49],inputs[50]],
        [inputs[33],inputs[34],inputs[35],inputs[42],inputs[43],inputs[44],inputs[51],inputs[52],inputs[53]],
        [inputs[54],inputs[55],inputs[56],inputs[63],inputs[64],inputs[65],inputs[72],inputs[73],inputs[74]],
        [inputs[57],inputs[58],inputs[59],inputs[66],inputs[67],inputs[68],inputs[75],inputs[76],inputs[77]],
        [inputs[60],inputs[61],inputs[62],inputs[69],inputs[70],inputs[71],inputs[78],inputs[79],inputs[80]]
    ]
    document.getElementById('form').style.display = 'none'
    document.getElementById('unsolved').style.display = 'none'
    document.getElementById('subHead').style.display = 'none'
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
                if(rows[i][j] == '0'){

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
        const words = ['1','2','3','4','5','6','7','8','9']
        const arrayX = []
        for(let i = 0;i<words.length;i++){
          if(array.includes(words[i]) != true){
              arrayX.push(words[i])
          }
        }
        return arrayX
    }

    const enterUniqueSolutions = () => {
        let returned = 0
        for(let i = 0;i<emptyCellNums.length;i++){
            if(emptyCellNums[i].length == 1){
                rows[emptyCells[i].pos[0]][emptyCells[i].pos[1]] = emptyCellNums[i][0]
                cols[emptyCells[i].pos[1]][emptyCells[i].pos[0]] = emptyCellNums[i][0]
                let box = getBox(emptyCells[i].pos[0],emptyCells[i].pos[1])
                boxes[box[0]+box[1]][box[2]+box[3]] = emptyCellNums[i][0]
                returned += 1
            }
        }
        return returned 
    }

    const solve = () => {
        let returned = 0
        while(true){
            runProgram()
            getEmptyCellNums()
            reverseEmptyCells()
            returned = enterUniqueSolutions()
            console.log(returned)
            console.log(emptyCellNums)
            console.log(rows)
            console.log(cols)
            console.log(boxes)
            if(emptyCells.length < 1){
                break
            }
            if(returned == 0){
                document.getElementById(`solved`).innerText = 'Unable to solve board'
                document.getElementById(`solvedSub`).innerText = 'Board was either unsovlable or too hard for this app! Try a different board with the reset button.'
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

resetButton.addEventListener('click', (e)=> {

    document.getElementById('form').style.display = 'block'
    document.getElementById('unsolved').style.display = 'block'
    document.getElementById('subHead').style.display = 'flex'
    document.getElementById('solved').style.display = 'none'
    document.getElementById('solvedBoard').style.display = 'none'
    document.getElementById(`solved`).innerText = 'Solved Board'
    document.getElementById(`solvedSub`).innerText = 'Board was solved! Try a another with the reset button.'


})
