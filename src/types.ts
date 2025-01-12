import type { AttachmentBuilder } from 'discord.js';
import type { RenderMessageContext } from './generator';

export type AttachmentTypes = 'audio' | 'video' | 'image' | 'file';

export enum ExportReturnType {
  Buffer = 'buffer',
  String = 'string',
  Attachment = 'attachment',
}

export type ObjectType<T extends ExportReturnType> = T extends ExportReturnType.Buffer
  ? Buffer
  : T extends ExportReturnType.String
  ? string
  : AttachmentBuilder;

export type GenerateFromMessagesOptions<T extends ExportReturnType> = Partial<{
  /**
   * The type of object to return
   * @default ExportReturnType.ATTACHMENT
   */
  returnType: T;

  /**
   * Downloads images and encodes them as base64 data urls
   * @default false
   */
  saveImages: boolean;

  /**
   * Callbacks for resolving channels, users, and roles
   */
  callbacks: RenderMessageContext['callbacks'];
  /**
   * Add custom CSS to create a unique and fresh look into your transcript
   * You will need to enablle useNewCSS in able for this to work!
   */
  customCSS: RenderMessageContext['customCSS'];
  /**
   * The name of the file to return if returnType is ExportReturnType.ATTACHMENT
   * @default 'transcript-{channel-id}.html'
   */
  filename: string;

  /**
   * Whether to include the "Powered by discord-html-transcripts" footer
   * Default = true
   * @default true
   */
  poweredBy: boolean;
  /**
   * Whether to use the New CSS or old, although if you are going for a realistic look to discord, use old.
   * Default = true
   * Note: In order to use the custom css, you will need to enable this.
   * @default true
   */
  useNewCSS: boolean;
  /**
   * The message right before "Powered by" text. Remember to put the {s}
   * Default = "Exported {number} message{s}"
   * @default 'Exported {number} message{s}.'
   */
  footerText: string;
  /**
   * Show a string on top of the transcript. Optional
   * To change color, use headerColor
   * @default ""
   */
  headerText: string;
  /**
   * Choose a language available. Optional
   * To change color, use headerColor
   * Languages -
   * English - Provided by derock
   * Brazilian - Provided by oreczx 
   * @default "English"
   */
  Language: string;
  /**
   * Your choice of color for that specific string. Remember this color is for CSS. Which means whatever color system compatible with CSS can be used.
   * Optional | Default is green
   * Your choice!
   * @default "green"
   */
  headerColor: string;
  /**
   * Whether to show the guild icon or a custom icon as the favicon
   * 'guild' - use the guild icon
   * or pass in a url to use a custom icon
   * @default "guild"
   */
  favicon: 'guild' | string;
}>;

export type CreateTranscriptOptions<T extends ExportReturnType> = Partial<
  GenerateFromMessagesOptions<T> & {
    /**
     * The max amount of messages to fetch. Use `-1` to recursively fetch.
     */
    limit: number;
  }
>;
