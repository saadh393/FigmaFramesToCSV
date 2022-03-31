figma.showUI(__html__);

const FILE_KEY = figma.fileKey;
const PROJECT_NAME = figma.currentPage.parent.name;
const urlList = [];

// Generating Frame URL
figma.currentPage.children.forEach((page) => {
  if (page.visible && page.type == "FRAME") {
    const url = `https://www.figma.com/proto/${FILE_KEY}/${PROJECT_NAME}?page-id=0:1&node-id=${page.id}&scaling=scale-down-width`;
    urlList.push({
      name: page.name,
      url: encodeURI(url),
      viewport: page.width < 500 ? "Mobile" : "Web",
    });
  }
});

// Generating Notification for Copied Link
figma.ui.onmessage = (message) => {
  figma.notify(message, { timeout: 900 });
};

// Resing The Window
figma.ui.resize(600, 400);

// Sending Data from Plugin to UI as Object {URL LIST, PROJECT NAME}
figma.ui.postMessage({
  urlList: urlList.sort(function (a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  }),
  projectName: PROJECT_NAME,
});
