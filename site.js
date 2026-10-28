// Shared behaviour for every page: event countdown badges, hiding events that
// have ended since the last build, the hero "Next up" badge, and newsletter forms.

(function () {
  var now = new Date();
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  function countdownLabel(el) {
    var eventDate = new Date(el.getAttribute('data-event-date') + 'T00:00:00');
    var days = Math.round((eventDate - today) / 86400000);
    if (days > 1) return { text: 'In ' + days + ' Days' };
    if (days === 1) return { text: 'Tomorrow' };
    if (days !== 0) return null;
    var startAttr = el.getAttribute('data-event-start');
    var startHour = startAttr ? parseInt(startAttr.split(':')[0], 10) : now.getHours();
    var text = startHour < 12 ? 'Happening This Morning' : startHour < 18 ? 'Happening This Afternoon' : 'Happening Tonight';
    return { text: text, live: true };
  }

  function hasEnded(el) {
    var end = el.getAttribute('data-event-end');
    return end ? new Date(end) <= now : false;
  }

  // Event rows (homepage + /events/)
  var rows = document.querySelectorAll('.tk-event-row[data-event-date]');
  var next = null;
  rows.forEach(function (row) {
    if (hasEnded(row)) { row.hidden = true; return; }
    if (!next) next = row;
    var el = row.querySelector('[data-countdown]');
    var label = countdownLabel(row);
    if (!el || !label) return;
    el.textContent = label.text;
    if (label.live) el.classList.add('tk-event-live');
  });
  document.querySelectorAll('.tk-flyer[data-event-end]').forEach(function (card) {
    if (hasEnded(card)) card.hidden = true;
  });
  document.querySelectorAll('.tk-event-group').forEach(function (group) {
    if (!group.querySelector('.tk-event-row:not([hidden])')) group.hidden = true;
  });

  // Hero "Next up" badge follows the first event that hasn't ended
  var badge = document.querySelector('[data-next-up]');
  if (badge) {
    if (!next) {
      badge.hidden = true;
    } else {
      badge.href = next.getAttribute('data-event-url');
      badge.querySelector('[data-next-up-text]').textContent = next.getAttribute('data-event-short');
      var icon = badge.querySelector('[data-next-up-icon]');
      if (icon) icon.textContent = next.getAttribute('data-event-icon') || '';
      var label = countdownLabel(next);
      var when = badge.querySelector('[data-next-up-when]');
      if (label) {
        when.textContent = label.text;
        if (label.live) badge.classList.add('tk-next-up-live');
      }
    }
  }

  // Single event page
  var page = document.querySelector('.tk-event-page[data-event-date]');
  if (page) {
    if (hasEnded(page)) {
      page.classList.add('tk-event-past');
    } else {
      var pageEl = page.querySelector('[data-countdown]');
      var pageLabel = countdownLabel(page);
      if (pageEl && pageLabel) {
        pageEl.textContent = pageLabel.text;
        if (pageLabel.live) pageEl.classList.add('tk-event-live');
      }
    }
  }

  // Press kit "copy bio" buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy'));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.innerText.trim()).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = original; }, 2000);
      });
    });
  });

  // Newsletter signup forms
  document.querySelectorAll('form[data-signup]').forEach(function (form) {
    var status = form.querySelector('[data-signup-status]');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = 'Signing up...';
      fetch(form.action, {
        method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error('signup failed');
        form.reset();
        form.classList.add('tk-signup-done');
        status.textContent = "You're on the list. See you on the dance floor.";
        btn.textContent = 'Signed Up';
      }).catch(function () {
        status.textContent = "That didn't go through. Try again in a minute.";
        btn.textContent = 'Sign Me Up';
        btn.disabled = false;
      });
    });
  });
}());
