function populateNovelSelects() {
    const novelSelect1 = document.getElementById('novel1');
    const novelSelect2 = document.getElementById('novel2');

    newNovels.forEach((novel, index) => {
        const option1 = document.createElement('option');
        option1.value = index;
        option1.text = novel.title;
        novelSelect1.add(option1);

        const option2 = document.createElement('option');
        option2.value = index;
        option2.text = novel.title;
        novelSelect2.add(option2);
    });
}
