const data = {
  'name': '中国',
  'children': [
    {
      'name': '浙江',
      'children':
      [
        { 'name': '杭州' },
        { 'name': '绍兴' },
      ],
    },
    {
      'name': '福建',
    },
    {
      'name': '浙江',
      'children':
      [
        { 'name': '杭州' },
        { 'name': '宁波' },
        { 'name': '绍兴' },
      ],
    },
    {
      'name': '浙江',
      'children':
      [
        { 'name': '杭州' },
        {
          'name': '宁波',
          'children':
          [
            { 'name': '杭州' },
            { 'name': '宁波' },
          ],
        },
      ],
    },
  ],
};

export default data;
