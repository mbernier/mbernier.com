import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Enhance content using OpenAI
 */
export async function enhanceContent(content: string, title?: string) {
  try {
    const prompt = `Please enhance the following content to make it more engaging, clear, and professional. 
    ${title ? `Title: ${title}` : ''}
    
    Content:
    ${content}
    
    Please provide:
    1. An improved version of the content
    2. A list of key improvements made
    3. Suggestions for SEO optimization
    4. Recommended tags/categories`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content editor and SEO specialist. Help improve content for better engagement and search visibility.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return {
      enhancedContent: completion.choices[0]?.message?.content || '',
      improvements: [],
      seoSuggestions: [],
      recommendedTags: [],
    };
  } catch (error) {
    console.error('Error enhancing content:', error);
    throw new Error('Failed to enhance content');
  }
}

/**
 * Generate an image using OpenAI DALL-E
 */
export async function generateArticleImage(
  title: string,
  content: string,
  options: { prompt?: string } = {}
) {
  try {
    let imagePrompt = options.prompt;
    
    if (!imagePrompt) {
      // Generate a prompt based on title and content
      const promptGeneration = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Generate a concise, visual description for an article image. Focus on the main theme or concept.',
          },
          {
            role: 'user',
            content: `Title: ${title}\nContent: ${content.substring(0, 500)}...`,
          },
        ],
        temperature: 0.7,
      });
      
      imagePrompt = promptGeneration.choices[0]?.message?.content || 'Professional business concept';
    }

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

/**
 * Suggest related content links
 */
export async function suggestRelatedLinks(
  content: string,
  availableContent: Array<{
    title: string;
    slug: string;
    type: 'article' | 'project';
  }>
) {
  try {
    const contentList = availableContent
      .map(item => `${item.type}: ${item.title} (${item.slug})`)
      .join('\n');

    const prompt = `Given the following content, suggest the most relevant related content from the available list.
    
    Content:
    ${content.substring(0, 1000)}
    
    Available content:
    ${contentList}
    
    Please return a JSON array of the most relevant items with their relevance scores (0-1).`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a content curator. Analyze content and suggest relevant related items.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content || '[]';
    
    try {
      return JSON.parse(response);
    } catch {
      // Fallback: return top 3 items based on simple keyword matching
      return availableContent.slice(0, 3).map(item => ({
        ...item,
        relevanceScore: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error suggesting related links:', error);
    return [];
  }
} 