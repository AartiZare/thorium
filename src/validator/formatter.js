function trim(){
    let name = 'Aarti Zare'
    console.log('Trimmed name is: ',name.trim())
}

function changeToLowerCase()
{
    let name = 'AARTi ZaRE'
    console.log('Name in lowercase is: ',name.toLowerCase())
}

function changeToUpperCase()
{
    let name = 'aarti zare'
    console.log('Name in uppercase is: ',name.toUpperCase())
}

module.exports.trim = trim
module.exports.changeToLowerCase = changeToLowerCase
module.exports.changeToUpperCase = changeToUpperCase