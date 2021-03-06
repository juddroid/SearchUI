import { _ } from './const';

export default class EventSlider {
  constructor(target) {
    this.target = target;
    this.prev = _.$(_.className.eventSlider.slideButtonPrev);
    this.next = _.$(_.className.eventSlider.slideButtonNext);
    this.page = _.$(_.id.eventSlider.mileageSlidePage);
    this.slide = _.$(_.id.eventSlider.topMileageSlide);
  }

  addEvent() {
    this.target.addEventListener(_.event.MOUSE_OVER, this.overEventSlider.bind(this));
    this.target.addEventListener(_.event.MOUSE_OUT, this.outEventSlider.bind(this));
    this.target.addEventListener(_.event.CLICK, this.clickEventSlider.bind(this));
  }
  overEventSlider(e) {
    if (e.target.classList.contains(_.className.eventSlider.pagingIndex) || e.target.getAttribute(_.className.eventSlider.dataIndex)) {
      this.pageHover(e);
    }
    this.prev.querySelector('.ico--prev').classList.replace('ico--prev', 'ico--prev__slide--hover');
    this.next.querySelector('.ico--next').classList.replace('ico--next', 'ico--next__slide--hover');
  }

  outEventSlider() {
    this.prev.querySelector('.ico--prev__slide--hover').classList.replace('ico--prev__slide--hover', 'ico--prev');
    this.next.querySelector('.ico--next__slide--hover').classList.replace('ico--next__slide--hover', 'ico--next');
  }

  clickPrev() {
    this.slide.classList.replace('slide', 'slide--click--prev');
    setTimeout(() => {
      this.slide.insertBefore(this.slide.lastElementChild, this.slide.firstElementChild);
      this.slide.classList.replace('slide--click--prev', 'slide');
      this.pagePrev();
    }, 300);
  }
  clickNext() {
    this.slide.classList.replace('slide', 'slide--click--next');
    setTimeout(() => {
      this.slide.insertBefore(this.slide.firstElementChild, null);
      this.slide.classList.replace('slide--click--next', 'slide');
      this.pageNext();
    }, 300);
  }

  clickEventSlider(e) {
    const isClickPrev = () => e.target.classList.contains('slide--button--prev') || e.target.classList.contains('ico--prev__slide--hover');
    const isClickNext = () => e.target.classList.contains('slide--button--next') || e.target.classList.contains('ico--next__slide--hover');

    if (isClickPrev()) {
      this.clickPrev();
    }
    if (isClickNext()) {
      this.clickNext();
    }
  }

  pagePrev() {
    this.page.insertBefore(this.page.firstElementChild, null);
  }

  pageNext() {
    this.page.insertBefore(this.page.lastElementChild, this.page.firstElementChild);
  }

  pageHoverPrev() {
    this.slide.insertBefore(this.slide.lastElementChild, this.slide.firstElementChild);
    this.pagePrev();
  }

  pageHoverNext() {
    this.slide.insertBefore(this.slide.firstElementChild, null);
    this.pageNext();
  }

  pageHover(e) {
    if (e.target.classList.contains('first')) return;
    if (e.target.getAttribute('data-index') === '1') {
      this.pageHoverNext();
    }
    if (e.target.getAttribute('data-index') === '2') {
      this.pageHoverPrev();
    }
  }
}
