// js/components/ProfileCell.js
function createProfileCell({ imageUrl, name, email }) {
  const cell = document.createElement('td');
  cell.className = 'employee-name-cell';

  const profileImage = document.createElement('img');
  profileImage.src = imageUrl;
  profileImage.alt = 'Profile';
  profileImage.className = 'profile-image';

  const nameContainer = document.createElement('div');
  const nameSpan = document.createElement('span');
  nameSpan.className = 'employee-name';
  nameSpan.textContent = name;

  const emailSpan = document.createElement('span');
  emailSpan.className = 'employee-email';
  emailSpan.textContent = email;

  nameContainer.appendChild(nameSpan);
  nameContainer.appendChild(emailSpan);
  cell.appendChild(profileImage);
  cell.appendChild(nameContainer);

  return cell;
}

export { createProfileCell };
