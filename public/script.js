function setLanguageAttribute() {
  const codeBlocks = document.querySelectorAll("pre code");

  codeBlocks.forEach((block) => {
    const languageClass = block.className.match(/language-(\w+)/);

    if (languageClass) {
      block.parentElement?.setAttribute("data-language", languageClass[1]);
    }
  });
}

function getCodeBlocks() {
  return document.querySelectorAll("pre code");
}

function setLanguageWhenAvailable() {
  return new Promise((resolve) => {
    const codeBlocks = getCodeBlocks();

    if (codeBlocks.length > 0) {
      setLanguageAttribute();
      resolve();

      return;
    }

    const observer = new MutationObserver(() => {
      const codeBlocks = getCodeBlocks();

      if (codeBlocks.length > 0) {
        observer.disconnect();
        setLanguageAttribute();
        resolve();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

(async () => {
  await setLanguageWhenAvailable();
})();
