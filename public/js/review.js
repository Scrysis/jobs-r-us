const oneStar = ['1']
const twoStar = ['2']
const threeStar = ['3']
const fourStar = ['4']
const fiveStar = ['5']



var createRating = () => {
    const radio = document.querySelector('.radio');
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


