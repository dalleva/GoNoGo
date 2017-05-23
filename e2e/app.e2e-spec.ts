import { GoNoGoPage } from './app.po';

describe('go-no-go App', () => {
  let page: GoNoGoPage;

  beforeEach(() => {
    page = new GoNoGoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
