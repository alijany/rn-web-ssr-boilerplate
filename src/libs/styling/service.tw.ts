export default function tw(
  ...styles: Array<string | boolean | undefined | null>
): string {
  return styles.filter(style => style).join(' ');
}
