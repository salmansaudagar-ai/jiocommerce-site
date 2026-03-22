export const homePageQuery = `
  *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    slug,
    metaDescription,
    ogImage,
    sections,
    status,
  },
  "metrics": *[_type == "metric"] | order(updatedAt desc),
  "customers": *[_type == "customer" && "home" in displayOn] | order(_createdAt desc),
  "recentPosts": *[_type == "post" && status == "published"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
  }
`;

export const platformPageQuery = `
  *[_type == "page" && slug.current == "platform"][0] {
    _id,
    title,
    slug,
    metaDescription,
    ogImage,
    sections,
    status,
  },
  "relatedFeatures": *[_type == "feature" && category == "platform"] | order(sortOrder asc)
`;

export const solutionPageQuery = `
  *[_type == "page" && slug.current == "solutions"][0] {
    _id,
    title,
    slug,
    metaDescription,
    ogImage,
    sections,
    status,
  },
  "relatedFeatures": *[_type == "feature" && category == "solution"] | order(sortOrder asc)
`;

export const blogListQuery = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    publishedAt,
  }
`;

export const blogPostQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags,
    status,
    publishedAt,
    source,
  }
`;

export const navQuery = `
  *[_type == "navItem"] | order(sortOrder asc) {
    _id,
    label,
    description,
    href,
    icon,
    group,
    "parent": parentRef->label,
    sortOrder,
  }
`;

export const metricsQuery = `
  *[_type == "metric"] | order(updatedAt desc) {
    _id,
    key,
    value,
    displayLabel,
    displayLocation,
    source,
    updatedAt,
  }
`;

export const customersQuery = `
  *[_type == "customer"] {
    _id,
    name,
    logo,
    type,
    vertical,
    "caseStudy": caseStudyRef-> {
      _id,
      title,
      slug,
    },
    "metric": highlightMetric-> {
      _id,
      key,
      value,
      displayLabel,
    },
    displayOn,
  }
`;
