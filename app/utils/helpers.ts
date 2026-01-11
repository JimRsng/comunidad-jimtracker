export const getIconURL = (iconId: number) => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`;
};

export const getRandomIconId = () => {
  const creationIcons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  const randomIndex = Math.floor(Math.random() * creationIcons.length);
  return creationIcons[randomIndex]!;
};
