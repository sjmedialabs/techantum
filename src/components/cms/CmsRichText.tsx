interface CmsRichTextProps {
  html: string;
  className?: string;
  as?: 'div' | 'p' | 'span';
}

function isEmptyRichText(value: string): boolean {
  const trimmed = value.trim();
  return !trimmed || trimmed === '<p></p>' || trimmed === '<p><br></p>' || trimmed === '<p><br/></p>';
}

/** Renders CMS rich text (HTML from editor) or plain text. */
export default function CmsRichText({ html, className = '', as: Tag = 'div' }: CmsRichTextProps) {
  const value = (html || '').trim();

  if (isEmptyRichText(value)) {
    return null;
  }

  const isHtml = /<[^>]+>/.test(value);

  if (!isHtml) {
    return <Tag className={className}>{value}</Tag>;
  }

  // HTML from Tiptap includes <p> tags — never wrap in <p> (invalid nesting → hydration errors)
  return (
    <div
      className={`cms-rich-text prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
