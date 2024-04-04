import {
  TablePageTemplate as TablePageTemplateI,
  TableEdgesNodeResponse as TableEdgesNodeResponseI,
} from 'interfaces/pageTemplates/table';

export const handleTablesResponse = (data: TableEdgesNodeResponseI) =>
  data
    ? data.pages.edges.map(({ node }: { node: TablePageTemplateI }) => node)
    : [];
