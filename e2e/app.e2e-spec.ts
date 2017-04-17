import { ElasticsearchPage } from './app.po';

describe('elasticsearch App', () => {
  let page: ElasticsearchPage;

  beforeEach(() => {
    page = new ElasticsearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
