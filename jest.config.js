module.exports = {  
  transform: {  
    '^.+\\.tsx?$': 'ts-jest', // 使用 ts-jest 来处理 TypeScript 文件  
  },  
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // 测试文件的正则表达式  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // 告诉 Jest 处理哪些文件扩展名  
  // 其他配置...  
};