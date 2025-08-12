import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL('https://rajatgangrade.substack.com/feed');
    
    const posts = feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || '',
      content: item.content || '',
      contentSnippet: item.contentSnippet || ''
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
