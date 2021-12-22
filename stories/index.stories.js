import { html } from 'lit';
import '../animation-snowcss.js';

export default {
  title: 'AnimationSnowcss',
  component: 'animation-snowcss',
  argTypes: {
    title: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

function Template({ title = 'Hello world', counter = 5, textColor, slot }) {
  return html`
    <animation-snowcss
      style="--animation-snowcss-text-color: ${textColor || 'black'}"
      .title=${title}
      .counter=${counter}
    >
      ${slot}
    </animation-snowcss>
  `;
}

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
