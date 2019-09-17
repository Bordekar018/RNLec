//By References(Normalisation)

let author={
    name:"vipul"
}

let course={
    name:"NodeJs",author:'id'
}

//Embedded (De-normalization)

let course={
    name:"Nodejs",
    author:{
        name:"vipul"
    }   
}