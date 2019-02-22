import { storiesOf } from '@storybook/angular';
// import { action } from '@storybook/addon-actions';
import { MyButtonComponent } from '../';

storiesOf('My Button', module)
  .add('with some emoji', () => ({
    component: MyButtonComponent,
    props: {
      text: 'Test Text',
    },
  }))
  .add('with some emoji and action', () => ({
    component: MyButtonComponent,
    props: {
      text: 'Test Text',
    //   click: action('clicked'),
    },
  }));