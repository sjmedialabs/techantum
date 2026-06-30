interface CmsRichTextProps {
  html: string;
  className?: string;
  as?: 'div' | 'p' | 'span';
}

/** Renders CMS rich text (HTML from editor) or plain text. */
export default function CmsRichText({ html, className = '', as: Tag = 'div' }: CmsRichTextProps) {
  const value = html || '';
  const isHtml = /<[^>]+>/.test(value);

  if (!isHtml) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={`cms-rich-text prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
