export function renderGallery({webformatURL, largeImageURL, likes, tags, views, comments, downloads}) {
  return `
  <a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="580px" height="400px"/>
    <div class="info">
    <p class="info-item likes">
      <b>Likes</b>
      <br>
      ${likes}
    </p>
    <p class="info-item views">
      <b>Views</b>
      <br>
      ${views}
    </p>
    <p class="info-item comments">
      <b>Comments</b>
      <br>
      ${comments}
    </p>
    <p class="info-item downloads">
      <b>Downloads</b>
      <br>
      ${downloads}
    </p>
    </div>
    </div>
</a>
`
}