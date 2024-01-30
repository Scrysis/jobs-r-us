const oneStar = ['1']
const twoStar = ['2']
const threeStar = ['3']
const fourStar = ['4']
const fiveStar = ['5']
const radio = document.querySelector('.radio');


var createRating = () => {
    radio.addEventListener('click', () => {
    })
    if(oneStar.checked) {
        console.log('one')
    }
    if(twoStar.checked) {
        console.log('two')
    }
    if(threeStar.checked) {
        console.log('three')
    }
    if(fourStar.checked) {
        console.log('four')
    }
    if(fiveStar.checked) {
        console.log('five')
    }
};

createRating();

var postRating = () => {
    radio.addEventListener('click', () => {
        if(oneStar.checked) {
            console.log(this.value)
        }
        if(twoStar.checked) {
            console.log(this.value)
        }
        if(threeStar.checked) {
            console.log(this.value)
        }
        if(fourStar.checked) {
            console.log(this.value)
        }
        if(fiveStar.checked) {
            console.log(this.value)
        }
    })
};
postRating();