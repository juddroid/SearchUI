import { _ } from './const';
import FetchAPI from './fetchAPI';

export default function Similarword() {
  this.input = _.$('.search-bar--keyword');
  this.similarwordList = _.$('.list_similarwords');
  this.wrapSuggestion = _.$('.wrap_suggestion');
  this.fetchAPI = new FetchAPI();
  this.suggestionIdx = -1;
}

// 3. cursor를 위아래로 움직이면 css가 바뀐다.
// 4. 1초 이상 아무 입력이 없으면 서버에서 데이터를 받아온다???
// 추가미션. 최근 검색어 기능

Similarword.prototype = {
  constructor: Similarword,
  addEvent: function () {
    this.input.addEventListener('keyup', this.requestData.bind(this));
    this.input.addEventListener('keyup', this.selectKeyword.bind(this));
    // this.input.addEventListener('keyup', this.changeListBackgorund.bind(this))
  },

  requestData: function () {
    return this.fetchAPI.getSimilarword(this.input.value, similarword);
  },
  getGroupSuggestion: function (data) {
    const groupSuggestion = data.items.reduce((acc, cur) => {
      const inputKeyword = data.q;
      const suggestionKeyword = cur.slice(0, -2);
      const suggestionKeywordIndex = suggestionKeyword.indexOf(inputKeyword);
      let nonHighlightingFront = '';
      let highlighting = '';
      let nonHighlightingBack = '';

      if (this.isIncludes(suggestionKeyword, inputKeyword)) {
        nonHighlightingFront = suggestionKeyword.slice(0, suggestionKeywordIndex);
        highlighting = suggestionKeyword.slice(suggestionKeywordIndex, suggestionKeywordIndex + inputKeyword.length);
        nonHighlightingBack = suggestionKeyword.slice(suggestionKeywordIndex + inputKeyword.length);
      } else {
        nonHighlightingFront = suggestionKeyword;
      }

      acc += `
      <li>
        <a href="/" class="link_keyword">${nonHighlightingFront}<span class="emph_word">${highlighting}</span>${nonHighlightingBack}</a>
      </li>
    `;
      return acc;
    }, ``);
    return groupSuggestion;
  },
  drawGroupSuggestion: function (data) {
    if (this.isEmpty(this.input.value)) return;
    if (this.isEmpty(data.items)) {
      return (this.wrapSuggestion.style.display = 'none');
    }
    this.similarwordList.innerHTML = `${this.getGroupSuggestion(data)}`;
  },

  selectKeyword: function (e) {
    if (e.key === 'ArrowDown') {
      if (this.isEdge(this.suggestionIdx)) return;
      this.suggestionIdx++;
      this.changeListBackgorund();
      console.log(e.key, this.suggestionIdx);
      return;
    }
    if (e.key === 'ArrowUp') {
      if (this.isEdge(this.suggestionIdx)) return;
      this.suggestionIdx--;
      this.changeListBackgorund();
      console.log(e.key, this.suggestionIdx);
      return;
    }
  },

  changeListBackgorund: function () {
    const similarwordLists = this.similarwordList.querySelectorAll('li');
    similarwordLists[this.suggestionIdx].style.background = '#e5e5e5';
  },

  isEmpty: function (data) {
    return data.length === 0;
  },

  isIncludes: function (box, item) {
    return box.includes(item);
  },

  isEdge: function (idx) {
    return idx === -2 || idx === 10;
  },
};

window.similarword = function similarword(data) {
  const groupSuggestion = new Similarword();
  return groupSuggestion.drawGroupSuggestion.call(groupSuggestion, data);
};
