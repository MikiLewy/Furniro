export const creatorsTopPicksKeys = {
  all: ['creators-top-picks'] as const,
  lists: () => [...creatorsTopPicksKeys.all, 'list'] as const,
  list: () => [...creatorsTopPicksKeys.lists()] as const,
};
