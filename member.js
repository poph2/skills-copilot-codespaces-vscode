function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member__skills');
  const memberSkillsList = document.querySelector('.member__skills-list');
  const memberSkillsListItems = document.querySelectorAll('.member__skills-list-item');

  if (member) {
    member.addEventListener('click', () => {
      memberSkills.classList.toggle('member__skills--active');
      memberSkillsList.classList.toggle('member__skills-list--active');
    });

    memberSkillsListItems.forEach((item) => {
      item.addEventListener('click', () => {
        memberSkills.classList.remove('member__skills--active');
        memberSkillsList.classList.remove('member__skills-list--active');
      });
    });
  }
}