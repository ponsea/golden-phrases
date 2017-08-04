import { GoldenPhrasesPage } from './app.po';

describe('golden-phrases App', () => {
  let page: GoldenPhrasesPage;

  beforeEach(() => {
    page = new GoldenPhrasesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
