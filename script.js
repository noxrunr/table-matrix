appendNewRow = () => {
    const table = document.getElementById('dom-table').getElementsByTagName('tbody')[0]
    const columnCount = document.getElementById('dom-table').rows[0].cells.length

    const row = table.insertRow(-1)
    row.classList.add('row')

    for (let i = 0; i < columnCount; i++) {
        const cell = row.insertCell(i)
        cell.classList.add('cell')

        const inputElement = document.createElement('INPUT')
        inputElement.setAttribute('type', 'number')
        inputElement.addEventListener('input', (event) => calculateSum(event.target))

        cell.appendChild(inputElement)
    }

    const sumCell = row.insertCell(-1)
    sumCell.classList.add('cell', 'sum')
    sumCell.innerHTML = '0'
}

getColumCollection = (table, index) => {
    const tableBody = table.getElementsByTagName('tbody')[0].rows
    let columnCollection = []
    
    if (index < 0) return

    
    for (let i = 0; i < tableBody.length; i++) {
        columnCollection.push(tableBody[i].cells[index])
    }

    return columnCollection
}

getRowCollection = (table, index) => {
    const tableBody = table.getElementsByTagName('tbody')[0].rows
    let rowCollection = []

    if (index < 0) return

    for (let i = 0; i < tableBody[index - 1].cells.length; i++) {
        rowCollection.push(tableBody[index - 1].cells[i])
    }

    return rowCollection
}

calculateSum = (element) => {
    const rowIndex = element.parentElement.parentElement.rowIndex 
    const cellIndex = element.parentElement.cellIndex
    let sumRow = 0;
    let sumColumn = 0

    const rowSumElement = document.getElementById('dom-table').getElementsByTagName('tbody')[0].rows[rowIndex - 1].cells
    const columnSumElement = document.getElementById('dom-table').getElementsByTagName('tfoot')[0].rows
    
    const rowCollection =  getRowCollection(document.getElementById('dom-table'), rowIndex)
    const columnCollection = getColumCollection(document.getElementById('dom-table'), cellIndex)

    rowCollection.forEach( (element, index, array) => {
        if (index === array.length - 1) return
        if (element.children[0].value !== '')
            sumRow += parseInt(element.children[0].value)
    })

    columnCollection.forEach( (element, index, array) => {
        if (element.children[0].value !== '')
            sumColumn += parseInt(element.children[0].value)
    })
    
    rowSumElement[rowSumElement.length - 1].innerHTML = sumRow
    columnSumElement[0].cells[cellIndex].innerHTML = sumColumn
}