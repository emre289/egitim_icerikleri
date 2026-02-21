function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }
}

function initTypingText() {
  const target = document.getElementById('typing-text');
  const titles = ['Veri Bilimci', 'AI Uzmanı', 'ML Mühendisi'];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const full = titles[titleIndex];
    const next = isDeleting ? full.slice(0, charIndex - 1) : full.slice(0, charIndex + 1);

    target.textContent = next;
    charIndex = next.length;

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && next === full) {
      delay = 1300;
      isDeleting = true;
    } else if (isDeleting && next.length === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

function initExpandableBlocks() {
  const previewItems = document.querySelectorAll('.preview-text');

  previewItems.forEach((preview) => {
    const textId = preview.dataset.textId;
    const limit = Number(preview.dataset.limit || '80');
    const source = document.getElementById(textId);
    const toggleBtn = document.querySelector(`.toggle-btn[data-text-id="${textId}"]`);

    if (!source || !toggleBtn) {
      return;
    }

    const fullText = source.value.trim();
    let expanded = false;

    const render = () => {
      if (expanded || fullText.length <= limit) {
        preview.textContent = fullText;
        toggleBtn.textContent = 'Daha Az Göster';
        if (fullText.length <= limit) {
          toggleBtn.style.display = 'none';
        }
      } else {
        preview.textContent = `${fullText.slice(0, limit)}...`;
        toggleBtn.textContent = 'Devamı Gör';
        toggleBtn.style.display = 'inline-flex';
      }
    };

    toggleBtn.addEventListener('click', () => {
      expanded = !expanded;
      render();
    });

    render();
  });
}

async function copyText(id, button) {
  const source = document.getElementById(id);
  if (!source) {
    return;
  }

  const original = button.textContent;

  try {
    await navigator.clipboard.writeText(source.value);
    button.textContent = 'Kopyalandı';
  } catch (error) {
    source.style.position = 'static';
    source.style.opacity = '1';
    source.select();
    document.execCommand('copy');
    source.style.position = '';
    source.style.opacity = '';
    button.textContent = 'Kopyalandı';
  }

  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', () => {
      copyText(button.dataset.target, button);
    });
  });
}

function renderLogos() {
  const groups = [
    {
      title: 'Karakter Oluşturma',
      links: [
        { name: 'HeyGen', url: 'https://app.heygen.com/home' },
        { name: 'Hedra', url: 'https://www.hedra.com/' },
        { name: 'Dreamina', url: 'https://dreamina.capcut.com/ai-tool/home/' }
      ]
    },
    {
      title: 'Video Oluşturma Araçları',
      links: [
        { name: 'Fal AI', url: 'https://fal.ai/dashboard' },
        { name: 'Kling AI', url: 'https://app.klingai.com/' },
        { name: 'Higgsfield', url: 'https://higgsfield.ai/' },
        { name: 'Google Flow', url: 'https://labs.google/fx/tools/flow' },
        { name: 'CapCut Seedance', url: 'https://www.capcut.com/tools/seedance-2-0' }
      ]
    },
    {
      title: 'Seslendirme İçin',
      links: [
        { name: 'MiniMax TTS', url: 'https://www.minimax.io/audio/text-to-speech' },
        { name: 'ElevenLabs', url: 'https://elevenlabs.io/' }
      ]
    },
    {
      title: 'Müzik ve Efekt',
      links: [{ name: 'Epidemic Sound Labs', url: 'https://www.epidemicsound.com/labs/studio/' }]
    },
    {
      title: 'Kod Üzerinden Edit',
      links: [{ name: 'Remotion', url: 'https://www.remotion.dev/' }]
    },
    {
      title: 'Vibe Coding',
      links: [
        { name: 'Lovable', url: 'https://lovable.dev/' },
        { name: 'Stitch', url: 'https://stitch.withgoogle.com/' },
        { name: 'Replit', url: 'https://replit.com/' }
      ]
    },
    {
      title: 'Sunum Oluşturma',
      links: [
        { name: 'NotebookLM', url: 'https://notebooklm.google.com/' },
        { name: 'Gamma', url: 'https://gamma.app/create' },
        { name: 'GenSpark', url: 'https://www.genspark.ai/' },
        { name: 'Napkin', url: 'https://app.napkin.ai/' }
      ]
    },
    {
      title: 'Sunucu Üzerindeki Agent',
      links: [{ name: 'OpenClaw', url: 'https://openclaw.ai/' }]
    },
    {
      title: 'Sunucu Kiralama',
      links: [{ name: 'AWS', url: 'https://aws.amazon.com/tr' }]
    }
  ];

  const grid = document.getElementById('logo-grid');
  if (!grid) {
    return;
  }

  const toFavicon = (url) => `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`;

  groups.forEach((group) => {
    const category = document.createElement('div');
    category.className = 'logo-category';

    const title = document.createElement('h3');
    title.textContent = group.title;
    category.appendChild(title);

    const list = document.createElement('div');
    list.className = 'logo-links';

    group.links.forEach((item) => {
      const anchor = document.createElement('a');
      anchor.className = 'logo-link';
      anchor.href = item.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = toFavicon(item.url);
      img.alt = `${item.name} logosu`;

      const label = document.createElement('span');
      label.textContent = item.name;

      anchor.appendChild(img);
      anchor.appendChild(label);
      list.appendChild(anchor);
    });

    category.appendChild(list);
    grid.appendChild(category);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingText();
  initExpandableBlocks();
  initCopyButtons();
  renderLogos();
});
