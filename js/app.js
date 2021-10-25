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
    var currentRow 
    var currentCol
    var takenNums = []
    var boradSolved = true

    const input1 = document.getElementById('input1')
    const input2 = document.getElementById('input2')
    const input3 = document.getElementById('input3')
    const input4 = document.getElementById('input4')
    const input5 = document.getElementById('input5')
    const input6 = document.getElementById('input6')
    const input7 = document.getElementById('input7')
    const input8 = document.getElementById('input8')
    const input9 = document.getElementById('input9')
    const input10 = document.getElementById('input10')
    const input11 = document.getElementById('input11')
    const input12 = document.getElementById('input12')
    const input13 = document.getElementById('input13')
    const input14 = document.getElementById('input14')
    const input15 = document.getElementById('input15')
    const input16 = document.getElementById('input16')
    
    const rows = [ 
        [input1.value,input2.value,input3.value,input4.value],
        [input5.value,input6.value,input7.value,input8.value],
        [input9.value,input10.value,input11.value,input12.value],
        [input13.value,input14.value,input15.value,input16.value]
    ]
    const cols = [ 
        [input1.value,input5.value,input9.value,input13.value],
        [input2.value,input6.value,input10.value,input14.value],
        [input3.value,input7.value,input11.value,input15.value],
        [input4.value,input8.value,input12.value,input16.value]
    ]

    document.getElementById('form').style.display = 'none'
    document.getElementById('unsolved').style.display = 'none'
    
    // function that looks for empty cell
    const lookForEmptyCell = () => {
        console.log('looking for empty cell')  
        for (let i = 0;i<rows.length;i++) {
            for(let j = 0;j<rows[i].length;j++){
                if(rows[i][j] == ''){
                    console.log('found empty cell')
                    currentRow = i
                    currentCol = j
                    console.log(currentRow,currentCol)
                    return
                }
            }
        }
        boradSolved = false
    }


    // function that narrows down what numbers can fit in the current spot
    const getUsedNums = () => {
        console.log('getting Used Nums')

            var rowNums = rows[currentRow].filter(isNotEmpty)
            rowNums.forEach(rowNums => takenNums.push(rowNums))

            var colNums = cols[currentCol].filter(isNotEmpty)
            colNums.forEach(colNums => takenNums.push(colNums))

            // get numbers in same box
            if(currentRow < 2 && currentCol < 2){
                console.log('first quardrant')
                takenNums.push(rows[0][0])
                takenNums.push(rows[0][1])
                takenNums.push(rows[1][0])
                takenNums.push(rows[1][1])

            } else if(currentRow > 1 && currentCol < 2){
                console.log('second quardrant')
                takenNums.push(rows[2][0])
                takenNums.push(rows[2][1])
                takenNums.push(rows[3][0])
                takenNums.push(rows[3][1])

            } else if(currentRow < 2 && currentCol > 1) {
                console.log('third quardrant')
                takenNums.push(rows[0][2])
                takenNums.push(rows[0][3])
                takenNums.push(rows[1][2])
                takenNums.push(rows[1][3])

            }  else if(currentRow > 1 && currentCol > 1 ) {
                console.log('fourth quardrant')
                takenNums.push(rows[2][2])
                takenNums.push(rows[2][3])
                takenNums.push(rows[3][2])            
                takenNums.push(rows[3][3])

            }
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

    solveBoard()
    document.getElementById('solved1').innerText = rows[0][0]
    document.getElementById('solved2').innerText = rows[0][1]
    document.getElementById('solved3').innerText = rows[0][2]
    document.getElementById('solved4').innerText = rows[0][3]
    document.getElementById('solved5').innerText = rows[1][0]
    document.getElementById('solved6').innerText = rows[1][1]
    document.getElementById('solved7').innerText = rows[1][2]
    document.getElementById('solved8').innerText = rows[1][3]
    document.getElementById('solved9').innerText = rows[2][0]
    document.getElementById('solved10').innerText = rows[2][1]
    document.getElementById('solved11').innerText = rows[2][2]
    document.getElementById('solved12').innerText = rows[2][3]
    document.getElementById('solved13').innerText = rows[3][0]
    document.getElementById('solved14').innerText = rows[3][1]
    document.getElementById('solved15').innerText = rows[3][2]
    document.getElementById('solved16').innerText = rows[3][3]

    document.getElementById('solved').style.display = 'flex'
    document.getElementById('solvedBoard').style.display = 'flex'
})
