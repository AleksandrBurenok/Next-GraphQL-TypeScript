import {
  Tag as TagI,
  TagsEdgesNodeResponse as TagsEdgesNodeResponseI,
} from 'interfaces/tag';

export const handleTagsResponse = (data: TagsEdgesNodeResponseI) =>
  data ? data.tags.edges.map(({ node }: { node: TagI }) => node) : [];
