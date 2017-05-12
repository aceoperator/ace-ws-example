import { AceWsClientPage } from './app.po';

describe('ace-ws-client App', function() {
  let page: AceWsClientPage;

  beforeEach(() => {
    page = new AceWsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
