export default function sitemap() {
    return [
      {
        url: 'https://www.triangel-loopbaantest.be',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://www.triangel-loopbaantest.be/test',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://www.triangel-loopbaantest.be/privacy',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  }