// Dữ liệu flashcard - Thêm/sửa/xóa nội dung ở đây
export interface Flashcard {
  id: number
  type: string
  question: string
  answer: string
}

// Validation utilities
export class FlashcardValidator {
  static validateFlashcard(card: any): card is Flashcard {
    return (
      card &&
      typeof card.id === 'number' &&
      card.id > 0 &&
      typeof card.type === 'string' &&
      card.type.trim().length > 0 &&
      typeof card.question === 'string' &&
      card.question.trim().length > 0 &&
      typeof card.answer === 'string' &&
      card.answer.trim().length > 0
    )
  }

  static validateFlashcards(cards: any[]): Flashcard[] {
    if (!Array.isArray(cards)) {
      console.error('Flashcards data is not an array')
      return []
    }

    const validCards: Flashcard[] = []
    const seenIds = new Set<number>()

    cards.forEach((card, index) => {
      if (!this.validateFlashcard(card)) {
        console.error(`Invalid flashcard at index ${index}:`, card)
        return
      }

      if (seenIds.has(card.id)) {
        console.error(`Duplicate flashcard ID: ${card.id} at index ${index}`)
        return
      }

      seenIds.add(card.id)
      validCards.push(card)
    })

    return validCards
  }
}

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    type: 'Level 1 - Nhớ',
    question: 'Hãy kể ra 3 từ khóa dùng để khai báo biến trong JavaScript.',
    answer:
      'Câu trả lời: var, let, const.\nFeynman: Hãy tưởng tượng bạn có ba chiếc hộp để cất đồ: var là chiếc hộp cũ dễ bị xáo trộn; let là hộp mới chỉ dùng trong căn phòng hiện tại; const là hộp khóa kín, không đổi được món đồ chính bên trong.\nDocs: ECMAScript chỉ định var có phạm vi function và hoisting, let/const có phạm vi block, trong đó const yêu cầu gán giá trị ngay khi khai báo.\nVí dụ: let score = 0; const PI = 3.14; var legacyName = "JS".'
  },
  {
    id: 2,
    type: 'Level 1 - Nhớ',
    question:
      'Hãy liệt kê 7 kiểu dữ liệu nguyên thủy (primitive) trong JavaScript và mô tả ngắn gọn từng kiểu.',
    answer:
      'Câu trả lời: Number (số), String (chuỗi ký tự), Boolean (đúng/sai), Null (giá trị trống có chủ đích), Undefined (không được gán), Symbol (định danh duy nhất), BigInt (số nguyên rất lớn).\nFeynman: Primitive giống các viên gạch đơn lẻ không thể bẻ nhỏ hơn: mỗi viên có công dụng rõ ràng như gạch số, gạch chữ, gạch tín hiệu bật/tắt.\nDocs: ECMAScript định nghĩa 7 primitive, được so sánh bằng giá trị và không có thuộc tính riêng.\nVí dụ: const samples = [42, "hello", false, null, undefined, Symbol("id"), 9007199254740993n].'
  },
  {
    id: 3,
    type: 'Level 1 - Nhớ',
    question: 'Nêu danh sách các giá trị "falsy" mặc định trong JavaScript.',
    answer:
      'Câu trả lời: false, 0, -0, 0n, "", null, undefined, NaN.\nFeynman: Khi JavaScript hỏi "có thật không?", các giá trị này đều trả lời "không" dù hình thức khác nhau.\nDocs: Trong chuyển đổi boolean, các giá trị trên trở thành false theo quy tắc ToBoolean của ECMAScript.\nVí dụ: Boolean("") === false và Boolean(0) === false.'
  },
  {
    id: 4,
    type: 'Level 1 - Nhớ',
    question: 'Sự khác biệt cơ bản giữa toán tử so sánh == và === là gì?',
    answer:
      'Câu trả lời: == so sánh sau khi ép kiểu còn === so sánh nghiêm ngặt cả kiểu lẫn giá trị.\nFeynman: Nếu bạn chỉ hỏi "trông giống không?" (==) bạn có thể nhầm áo xanh với áo lam; còn "có đúng người tôi cần không?" (===) thì phải khớp tuyệt đối.\nDocs: Abstract Equality (==) kích hoạt chuyển đổi kiểu trong khi Strict Equality (===) không làm điều đó.\nVí dụ: 0 == "0" cho true, 0 === "0" cho false.'
  },
  {
    id: 5,
    type: 'Level 1 - Nhớ',
    question: 'Viết cú pháp mẫu của template literal (template string) và nêu công dụng chính của nó.',
    answer:
      'Câu trả lời: Sử dụng dấu backtick bao quanh và nội suy bằng ${biểu_thức}.\nFeynman: Template literal như viết thư tay nhưng chừa khoảng trống để điền tên người nhận ngay trong thư.\nDocs: ECMAScript định nghĩa TemplateLiteral cho phép nội suy biểu thức và chuỗi nhiều dòng tự nhiên.\nVí dụ: const total = 5; console.log(`Bạn đã chọn ${total} sản phẩm.`).'
  },
  {
    id: 6,
    type: 'Level 1 - Nhớ',
    question: 'Toán tử ?. (optional chaining) được dùng để làm gì?',
    answer:
      'Câu trả lời: Dùng để truy cập thuộc tính hoặc phương thức lồng sâu an toàn, trả về undefined nếu gặp null hoặc undefined trên đường đi.\nFeynman: Nó giống hỏi "nếu có cái hộp này thì mở tiếp, còn không thì thôi đừng làm vỡ đồ".\nDocs: OptionalChainingOperator dừng đánh giá khi toán hạng trước là nullish.\nVí dụ: const email = user?.profile?.email.'
  },
  {
    id: 7,
    type: 'Level 1 - Nhớ',
    question: 'Toán tử hợp nhất nullish (nullish coalescing) ?? được dùng để làm gì?',
    answer:
      'Câu trả lời: Dùng để lấy giá trị dự phòng chỉ khi toán hạng bên trái là null hoặc undefined.\nFeynman: Giống như nói "nếu hộp chính trống rỗng thật sự, hãy lấy hộp dự phòng", còn giá trị 0 hay "" vẫn được giữ nguyên.\nDocs: NullishCoalescingOperator chỉ rẽ nhánh khi gặp nullish thay vì mọi giá trị falsy.\nVí dụ: const displayName = inputName ?? "Guest".'
  },
  {
    id: 8,
    type: 'Level 2 - Hiểu',
    question:
      'Hãy giải thích sự khác biệt về phạm vi (scope), hoisting và khả năng gán lại giá trị giữa let, const, và var.',
    answer:
      'Câu trả lời: var có phạm vi theo function, được hoisting và gán undefined trước khi chạy, cho phép gán lại; let và const có phạm vi block, cũng bị hoisting nhưng nằm trong temporal dead zone, let cho phép gán lại còn const thì không.\nFeynman: var như chiếc đèn chiếu sáng cả ngôi nhà, còn let/const là đèn trong từng phòng; với const dây điện bị niêm phong nên không đổi bóng được.\nDocs: ECMAScript mô tả hoisting và temporal dead zone cho let/const, còn var tạo ra binding function-scoped có thể gán lại.\nVí dụ: if (true) { var x = 1; let y = 2; const z = 3; } console.log(x); // 1 (y và z không truy cập được ngoài block).'
  },
  {
    id: 9,
    type: 'Level 2 - Hiểu',
    question: 'Phân biệt câu lệnh (statement) và biểu thức (expression). Cho một ví dụ cho mỗi loại.',
    answer:
      'Câu trả lời: Câu lệnh (statement) ra lệnh cho trình thông dịch thực thi hành động, còn biểu thức (expression) tạo ra một giá trị.\nFeynman: Statement giống câu mệnh lệnh "mở cửa", expression giống câu trả lời cho câu hỏi "bao nhiêu?".\nDocs: Cú pháp ECMAScript tách StatementList với Expression, mỗi loại xuất hiện ở ngữ cảnh khác nhau.\nVí dụ: if (x > 0) { console.log(x); } là statement; x > 0 hay user.name là expression.'
  },
  {
    id: 10,
    type: 'Level 2 - Hiểu',
    question:
      'Giải thích tại sao const không cho phép gán lại biến, nhưng vẫn cho phép thay đổi thuộc tính của một đối tượng hoặc phần tử của một mảng được gán cho biến đó.',
    answer:
      'Câu trả lời: const không cho phép gán lại biến vì binding bị khóa, nhưng object và array được gán cho biến đó vẫn có thể thay đổi thuộc tính nhờ chúng được lưu bằng tham chiếu.\nFeynman: const giống giữ chặt chiếc hộp, bạn không thể đổi hộp khác nhưng vẫn sắp xếp lại đồ bên trong hộp.\nDocs: Spec quy định const tạo ra immutable binding, còn bản thân object reference vẫn mutable.\nVí dụ: const person = { name: "Ana" }; person.name = "Ben"; // hợp lệ, nhưng person = {} sẽ lỗi.'
  },
  {
    id: 11,
    type: 'Level 2 - Hiểu',
    question: 'Phân biệt ý nghĩa và các trường hợp sử dụng phổ biến của null và undefined.',
    answer:
      'Câu trả lời: undefined biểu thị giá trị chưa được gán hoặc thuộc tính không tồn tại, còn null là giá trị trống được đặt có chủ đích.\nFeynman: undefined như một hộp chưa mở, null là hộp bạn đã mở và biết chắc bên trong rỗng.\nDocs: ECMAScript định nghĩa undefined là giá trị mặc định khi thiếu, còn null là literal dùng để đánh dấu trống có chủ ý.\nVí dụ: Hàm không return trả về undefined, còn API trả null khi muốn báo không tìm thấy dữ liệu.'
  },
  {
    id: 12,
    type: 'Level 2 - Hiểu',
    question:
      'Ép kiểu ngầm định (implicit coercion) là gì? Giải thích tại sao biểu thức 5 + "5" và 5 - "5" cho ra các kết quả khác nhau.',
    answer:
      'Câu trả lời: Ép kiểu ngầm định là khi JavaScript tự chuyển đổi kiểu dữ liệu để hoàn thành phép toán.\nFeynman: Khi bạn ghép dấu cộng, JavaScript đoán bạn muốn ghép chữ; khi trừ, JavaScript hiểu cần số nên ép chữ thành số.\nDocs: ToPrimitive và ToNumber trong đặc tả quy định cách chuyển đổi trước khi so sánh hoặc tính toán.\nVí dụ: 5 + "5" tạo ra chuỗi "55", còn 5 - "5" ép "5" thành 5 và cho 0.'
  },
  {
    id: 13,
    type: 'Level 2 - Hiểu',
    question: 'Khái niệm "truthy" và "falsy" trong JavaScript có nghĩa là gì?',
    answer:
      'Câu trả lời: Truthy là giá trị khi chuyển sang boolean ra true, falsy cho kết quả false.\nFeynman: Trong câu điều kiện, JavaScript hỏi "bạn tin điều này chứ?"—truthy trả lời có, falsy trả lời không.\nDocs: Thuật toán ToBoolean liệt kê những giá trị falsy, mọi giá trị khác được xem là truthy.\nVí dụ: if ("hello") console.log("hi"); chạy vì chuỗi rỗng mới falsy; Boolean(0) trả về false.'
  },
  {
    id: 14,
    type: 'Level 2 - Hiểu',
    question: 'Hãy giải thích cách hoạt động của short-circuit evaluation trong toán tử logic || và &&.',
    answer:
      'Câu trả lời: Toán tử || trả về toán hạng đầu tiên truthy và dừng lại, còn && trả về toán hạng đầu tiên falsy rồi dừng.\nFeynman: || giống kiểm tra hai cánh cửa, chỉ cần một cửa mở là bạn bước vào; && cần cả hai, nếu cửa đầu bị khóa thì quay đi ngay.\nDocs: LogicalOR và LogicalAND trong spec định nghĩa việc đánh giá từng vế và dừng khi đủ thông tin.\nVí dụ: const defaultName = input || "Guest"; user && user.name chỉ truy cập name khi user truthy.'
  },
  {
    id: 15,
    type: 'Level 2 - Hiểu',
    question: 'Khi nào nên dùng toán tử ?? thay cho ||? Cho một ví dụ cụ thể mà hai toán tử này cho kết quả khác nhau.',
    answer:
      'Câu trả lời: Dùng ?? khi chỉ muốn dùng giá trị dự phòng nếu vế trái là null hoặc undefined, thay vì mọi giá trị falsy như 0 hay "".\nFeynman: Nếu bạn chấp nhận số 0 như câu trả lời hợp lệ, đừng để toán tử || vội vàng gạt bỏ nó.\nDocs: NullishCoalescingOperator chỉ coi null và undefined là thiếu, trong khi LogicalOR coi mọi falsy.\nVí dụ: 0 || 5 cho 5 nhưng 0 ?? 5 vẫn giữ 0.'
  },
  {
    id: 16,
    type: 'Level 2 - Hiểu',
    question: 'Tại sao console.log(typeof null) lại trả về "object"?',
    answer:
      'Câu trả lời: console.log(typeof null) trả về "object" vì lỗi lịch sử trong cách biểu diễn null bằng bit-pattern 0 từ phiên bản đầu của spec.\nFeynman: Ngày xưa người ta gắn nhầm nhãn "object" lên hộp null và giờ quá muộn để bóc ra.\nDocs: Đặc tả ECMAScript ghi chú hành vi typeof null là "object" để giữ tương thích ngược.\nVí dụ: Kiểm tra null nên dùng value === null thay vì typeof.'
  },
  {
    id: 17,
    type: 'Level 2 - Hiểu',
    question:
      'Ép kiểu tường minh (explicit coercion) là gì? Cho ví dụ về cách sử dụng Number(), String(), và Boolean().',
    answer:
      'Câu trả lời: Ép kiểu tường minh là khi lập trình viên chủ động gọi hàm chuyển đổi kiểu.\nFeynman: Bạn tự dịch câu nói sang ngôn ngữ khác thay vì phó mặc người nghe đoán ý.\nDocs: Các hàm Number(), String() và Boolean() thực hiện chuyển đổi rõ ràng mà không dựa vào ngữ cảnh ngầm.\nVí dụ: Number("42") cho 42, String(10) cho "10", Boolean([]) cho true.'
  },
  {
    id: 18,
    type: 'Level 2 - Hiểu',
    question:
      'Hãy giải thích tại sao template string thường được ưu tiên sử dụng hơn so với việc nối chuỗi truyền thống bằng dấu +.',
    answer:
      'Câu trả lời: Template string dễ đọc hơn, tránh lỗi dấu ngoặc, hỗ trợ nội suy và viết nhiều dòng tự nhiên hơn so với nối chuỗi bằng dấu +.\nFeynman: Thay vì ghép từng mảnh bằng keo dán, bạn viết cả đoạn văn liền mạch và chừa chỗ điền thông tin.\nDocs: TemplateLiteral cho phép nội suy biểu thức và dòng mới mà không cần ký tự thoát.\nVí dụ: const msg = `Hello ${user.name}, hôm nay là ${new Date().toDateString()}`.'
  },
  {
    id: 19,
    type: 'Level 2 - Hiểu',
    question:
      'Sự khác biệt giữa việc sao chép giá trị của kiểu dữ liệu nguyên thủy và kiểu dữ liệu tham chiếu là gì?',
    answer:
      'Câu trả lời: Sao chép primitive tạo ra bản sao độc lập, còn sao chép kiểu tham chiếu chỉ sao chép địa chỉ trỏ đến cùng vùng nhớ.\nFeynman: Copy primitive như chép lại một tờ giấy mới, copy object giống chia sẻ đường link tới cùng tài liệu.\nDocs: Mô hình lưu trữ của ECMAScript phân biệt giữa value types và reference types.\nVí dụ: let a = 5; let b = a; // b độc lập, còn const obj1 = { x: 1 }; const obj2 = obj1; obj2.x = 2 khiến obj1.x cũng thành 2.'
  },
  {
    id: 20,
    type: 'Level 2 - Hiểu',
    question:
      'Tại sao hàm (function) trong JavaScript cũng được coi là một dạng object? Nêu một hệ quả thực tế của điều này.',
    answer:
      'Câu trả lời: Hàm là object callable nên có thể chứa thuộc tính và phương thức như mọi object khác.\nFeynman: Một hàm giống robot biết hành động nhưng vẫn đeo ba lô chứa dụng cụ riêng.\nDocs: Functions thừa hưởng từ Function.prototype và là objects có thể gán thuộc tính động.\nVí dụ: function greet() { return "hi"; } greet.description = "Chào hỏi"; console.log(greet.description); // "Chào hỏi".'
  },
  {
    id: 21,
    type: 'Level 2 - Hiểu',
    question: 'Toán tử ba ngôi (ternary operator) là gì và cú pháp cơ bản của nó như thế nào?',
    answer:
      'Câu trả lời: Toán tử ba ngôi viết dạng condition ? exprIfTrue : exprIfFalse để quyết định giá trị dựa trên điều kiện.\nFeynman: Nó hỏi "nếu đúng thì A, còn không thì B" trong một câu ngắn gọn.\nDocs: ConditionalExpression trong spec thay thế cho cấu trúc if...else đơn giản trả về giá trị.\nVí dụ: const status = score > 50 ? "pass" : "fail".'
  },
  {
    id: 22,
    type: 'Level 3 - Ứng dụng',
    question:
      'Sử dụng toán tử 3 ngôi để viết lại câu lệnh if...else gán giá trị cho biến message dựa vào điều kiện isLoggedIn.',
    answer:
      'Câu trả lời: const message = isLoggedIn ? "Chào mừng trở lại!" : "Vui lòng đăng nhập.";\nFeynman: Chiếc bảng thông báo tự chọn câu phù hợp dựa trên trạng thái đăng nhập.\nDocs: ConditionalExpression cho phép biểu thức gọn thay vì if...else chỉ để gán giá trị.\nVí dụ: const message = isLoggedIn ? "Chào mừng trở lại!" : "Vui lòng đăng nhập."; console.log(message);'
  },
  {
    id: 23,
    type: 'Level 3 - Ứng dụng',
    question:
      'Bạn có một đối tượng user có thể là null. Hãy sử dụng optional chaining (?.) và nullish coalescing (??) để truy cập an toàn thuộc tính user.address.city và gán giá trị mặc định là "Unknown" nếu không tìm thấy.',
    answer:
      'Câu trả lời: const city = user?.address?.city ?? "Unknown";\nFeynman: Nếu không có hộp user hoặc address, chúng ta dừng lại và lấy "Unknown" làm câu trả lời an toàn.\nDocs: Optional chaining dừng khi gặp nullish còn nullish coalescing cung cấp giá trị dự phòng đúng chuẩn.\nVí dụ: const city = user?.address?.city ?? "Unknown"; console.log(city);'
  },
  {
    id: 24,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một đoạn mã sử dụng && để gọi hàm login() chỉ khi biến isReady là true.',
    answer:
      'Câu trả lời: isReady && login();\nFeynman: Đây là câu "nếu sẵn sàng thì hành động", nếu isReady là false thì login không bao giờ được gọi.\nDocs: LogicalAND chỉ đánh giá toán hạng thứ hai khi toán hạng đầu tiên truthy.\nVí dụ: const isReady = true; function login() { console.log("Logging in"); } isReady && login(); // gọi login.'
  },
  {
    id: 25,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một biểu thức sử dụng || để gán giá trị cho biến userName từ inputName, nhưng nếu inputName là một chuỗi rỗng (""), userName sẽ nhận giá trị "Guest".',
    answer:
      'Câu trả lời: const userName = inputName || "Guest";\nFeynman: Nếu tên người dùng trống rỗng, chúng ta mời "Guest" đứng vào chỗ.\nDocs: LogicalOR trả về toán hạng thứ hai khi toán hạng đầu tiên falsy như chuỗi rỗng.\nVí dụ: const inputName = ""; const userName = inputName || "Guest"; // userName là "Guest".'
  },
  {
    id: 26,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một hàm greet(name) sử dụng template string để trả về chuỗi "Chào bạn, [tên]!". Nếu name là null hoặc undefined, hãy mặc định là "bạn".',
    answer:
      'Câu trả lời: function greet(name) { const safeName = name ?? "bạn"; return `Chào bạn, ${safeName}!`; }\nFeynman: Nếu không biết tên, hàm vẫn chào thân thiện bằng cách chọn từ "bạn".\nDocs: Kết hợp nullish coalescing và template literal để tạo chuỗi thân thiện.\nVí dụ: console.log(greet()); // "Chào bạn, bạn!"; console.log(greet("Lan")); // "Chào bạn, Lan!".'
  },
  {
    id: 27,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một hàm isPlainObject(value) trả về true nếu value là một object thuần (không phải array, function, hay null).',
    answer:
      'Câu trả lời: function isPlainObject(value) { return Object.prototype.toString.call(value) === "[object Object]"; }\nFeynman: Ta kiểm tra "chứng minh thư" của đối tượng để biết nó có phải object thuần hay không.\nDocs: Object.prototype.toString cung cấp type tag giúp phân biệt object thường với array, function.\nVí dụ: isPlainObject({}) // true; isPlainObject([]) // false.'
  },
  {
    id: 28,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết hàm sumNumbers(arr) nhận vào một mảng chứa nhiều kiểu dữ liệu khác nhau và trả về tổng của các phần tử là số.',
    answer:
      'Câu trả lời: function sumNumbers(arr) { return arr.reduce((total, item) => total + (typeof item === "number" ? item : 0), 0); }\nFeynman: Đi qua từng món trong giỏ và chỉ nhặt những gì là số để bỏ vào túi tổng.\nDocs: Array.prototype.reduce tích lũy giá trị với điều kiện lọc dựa trên typeof.\nVí dụ: sumNumbers([1, "3", 4]) // 5.'
  },
  {
    id: 29,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết hàm toBoolean(value) để chuyển đổi các giá trị như "true", "false", 1, 0, null, undefined thành kiểu boolean một cách hợp lý.',
    answer:
      'Câu trả lời: function toBoolean(value) { if (typeof value === "string") { const lower = value.trim().toLowerCase(); if (lower === "true") return true; if (lower === "false") return false; } return Boolean(value); }\nFeynman: Hàm dịch nhiều kiểu trả lời khác nhau về dạng "có" hoặc "không" một cách lịch sự.\nDocs: Việc chuẩn hóa chuỗi bằng trim và toLowerCase kết hợp với Boolean() giúp xử lý các giá trị còn lại.\nVí dụ: toBoolean(" true ") // true; toBoolean(0) // false.'
  },
  {
    id: 30,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một hàm isEmpty(value) trả về true nếu giá trị là "", null, undefined, NaN, mảng rỗng [], hoặc object không có key {}.',
    answer:
      'Câu trả lời: function isEmpty(value) { if (value == null) return true; if (typeof value === "number") return Number.isNaN(value); if (typeof value === "string") return value === ""; if (Array.isArray(value)) return value.length === 0; if (typeof value === "object") return Object.keys(value).length === 0; return false; }\nFeynman: Giống như kiểm tra từng loại hộp xem bên trong có đồ hay không trước khi kết luận rỗng.\nDocs: Sử dụng kiểm tra null lỏng, Number.isNaN và Object.keys để bao phủ các trường hợp phổ biến.\nVí dụ: isEmpty([]) // true; isEmpty({ a: 1 }) // false.'
  },
  {
    id: 31,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một hàm safeDivide(a, b) trả về kết quả a / b, nhưng nếu b bằng 0 hoặc không phải là số, hàm sẽ trả về null.',
    answer:
      'Câu trả lời: function safeDivide(a, b) { if (typeof a !== "number" || typeof b !== "number" || !Number.isFinite(b) || b === 0) { return null; } return a / b; }\nFeynman: Không bao giờ chia cho 0 để tránh "nổ máy tính", nên ta kiểm tra kỹ trước khi thực hiện phép chia.\nDocs: Number.isFinite giúp chặn các giá trị không hợp lệ trước khi chia.\nVí dụ: safeDivide(10, 2) // 5; safeDivide(10, 0) // null.'
  },
  {
    id: 32,
    type: 'Level 3 - Ứng dụng',
    question:
      'Cho mảng mixed = [0, "hello", false, "", 5, null]. Sử dụng phương thức filter và hàm Boolean để tạo một mảng mới chỉ chứa các giá trị truthy.',
    answer:
      'Câu trả lời: const truthyValues = mixed.filter(Boolean);\nFeynman: Boolean đóng vai trò như máy quét giữ lại những giá trị còn "sức sống".\nDocs: Array.prototype.filter truyền hàm Boolean làm predicate để loại bỏ falsy.\nVí dụ: const mixed = [0, "hello", false, "", 5, null]; const truthyValues = mixed.filter(Boolean); // ["hello", 5].'
  },
  {
    id: 33,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết đoạn mã chuyển đổi mảng ["15", "9.5", true, null, "30x"] thành một mảng số, các giá trị không hợp lệ sẽ bị bỏ qua.',
    answer:
      'Câu trả lời: const numbers = raw.map(value => Number(value)).filter(num => !Number.isNaN(num));\nFeynman: Ta rây sàng các giá trị, chỉ giữ lại những hạt trở thành số hợp lệ.\nDocs: Number() thực hiện chuyển đổi, Number.isNaN đảm bảo loại bỏ các giá trị không phải số.\nVí dụ: const raw = ["15", "9.5", true, null, "30x"]; kết quả numbers là [15, 9.5, 1, 0].'
  },
  {
    id: 34,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết hàm mergeSettings(userSettings, defaultSettings) sử dụng ?? để hợp nhất hai đối tượng. Giá trị từ defaultSettings chỉ được sử dụng khi thuộc tính tương ứng trong userSettings là null hoặc undefined.',
    answer:
      'Câu trả lời: function mergeSettings(userSettings, defaultSettings) { const base = defaultSettings ?? {}; const result = { ...base }; const source = userSettings ?? {}; for (const key of Object.keys(source)) { const value = source[key]; result[key] = value ?? base[key]; } return result; }\nFeynman: Lấy bản mặc định rồi chỉ thay khi người dùng cung cấp giá trị thực sự, bỏ qua khi họ gửi null hay undefined.\nDocs: Toán tử spread sao chép đối tượng, nullish coalescing giữ nguyên giá trị hợp lệ.\nVí dụ: mergeSettings({ theme: null, pageSize: 20 }, { theme: "light", pageSize: 10 }) trả về { theme: "light", pageSize: 20 }.'
  },
  {
    id: 35,
    type: 'Level 3 - Ứng dụng',
    question:
      'Sử dụng typeof để kiểm tra kiểu dữ liệu của các giá trị sau: false, null, [], {}, function(){}, 42n (BigInt).',
    answer:
      'Câu trả lời: typeof false // "boolean"; typeof null // "object"; typeof [] // "object"; typeof {} // "object"; typeof function(){} // "function"; typeof 42n // "bigint".\nFeynman: Dùng máy quét nhãn để biết mỗi giá trị thuộc loại gì, nhớ rằng null bị gắn nhãn object vì lịch sử.\nDocs: typeof operator trả về chuỗi đại diện cho loại dữ liệu theo đặc tả.\nVí dụ: typeof [] === "object" cho thấy mảng là object đặc biệt.'
  },
  {
    id: 36,
    type: 'Level 3 - Ứng dụng',
    question:
      'Hãy tạo một hàm add(a, b) có thể nhận vào hai số hoặc hai chuỗi số (ví dụ: "5" và "3") và luôn trả về kết quả là tổng dưới dạng số.',
    answer:
      'Câu trả lời: function add(a, b) { const numA = Number(a); const numB = Number(b); if (Number.isNaN(numA) || Number.isNaN(numB)) { throw new TypeError("Arguments must be numbers or numeric strings."); } return numA + numB; }\nFeynman: Luôn chuyển cả hai món quà thành số thực trước khi cộng để tránh hiểu nhầm.\nDocs: Number() chuyển đổi chuỗi số, Number.isNaN giúp kiểm tra đầu vào không hợp lệ.\nVí dụ: add("5", "3") // 8; add(2, 4) // 6.'
  },
  {
    id: 37,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết một đoạn mã khai báo biến counter bằng const. Sau đó, thử gán lại một giá trị mới cho nó và giải thích lỗi xảy ra.',
    answer:
      'Câu trả lời: const counter = 0; counter = 1; // TypeError: Assignment to constant variable.\nFeynman: Bạn cố đổi ổ khóa của két đã niêm phong nên hệ thống báo lỗi.\nDocs: Binding const trong ECMAScript không cho phép gán lại sau khi đã khởi tạo.\nVí dụ: Tăng counter bằng ++counter cũng ném lỗi tương tự.'
  },
  {
    id: 38,
    type: 'Level 3 - Ứng dụng',
    question:
      'Tạo một đối tượng car với các thuộc tính brand, model, và year. Sử dụng template string để tạo một câu mô tả về chiếc xe.',
    answer:
      'Câu trả lời: const car = { brand: "Toyota", model: "Corolla", year: 2020 }; const description = `Chiếc ${car.brand} ${car.model} sản xuất năm ${car.year}.`;\nFeynman: Chèn dữ liệu chiếc xe vào câu mô tả như đang kể chuyện.\nDocs: Template literal giúp ghép thuộc tính object vào chuỗi mạch lạc.\nVí dụ: console.log(description); // "Chiếc Toyota Corolla sản xuất năm 2020."'
  },
  {
    id: 39,
    type: 'Level 3 - Ứng dụng',
    question:
      'Viết hàm getLastElement(arr) trả về phần tử cuối cùng của mảng. Nếu mảng không hợp lệ hoặc rỗng, trả về undefined.',
    answer:
      'Câu trả lời: function getLastElement(arr) { if (!Array.isArray(arr) || arr.length === 0) return undefined; return arr[arr.length - 1]; }\nFeynman: Kiểm tra mảng có tồn tại không rồi lấy viên gạch cuối cùng.\nDocs: Array.isArray đảm bảo chỉ thao tác trên mảng hợp lệ và dùng chỉ số cuối arr.length - 1.\nVí dụ: getLastElement([1, 2, 3]) // 3; getLastElement([]) // undefined.'
  },
  {
    id: 40,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích đoạn mã sau. Giải thích tại sao nó không hoạt động như mong đợi và làm thế nào let có thể khắc phục vấn đề này.\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
    answer:
      'Câu trả lời: Đoạn mã in ba lần số 3 vì var i có phạm vi function nên mọi callback setTimeout chia sẻ cùng một biến i đã tăng lên 3 sau vòng lặp; dùng let tạo ra biến i mới cho từng lần lặp nên mỗi callback giữ đúng giá trị.\nFeynman: Việc dùng var giống viết lên bảng chung nên cuối cùng cả ba dòng đều thành 3, còn let cấp cho mỗi lượt tờ giấy riêng.\nDocs: let cung cấp block scope và tạo BindingEnvironment mới cho mỗi iteration theo đặc tả.\nVí dụ: for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); } sẽ in 0, 1, 2.'
  },
  {
    id: 41,
    type: 'Level 4 - Phân tích',
    question: 'Phân tích và giải thích từng bước ép kiểu khiến cho biểu thức [] == ![] trả về true.',
    answer:
      'Câu trả lời: ![] chuyển mảng rỗng thành false vì [] là truthy; so sánh trở thành [] == false; [] qua ToPrimitive thành "", rồi "" == false; false qua ToNumber thành 0 và "" cũng thành 0 nên phép so sánh cuối cùng là 0 == 0 trả về true.\nFeynman: JavaScript cố bóp méo mỗi bên cho giống nhau cho tới khi cả hai cùng biến thành số 0.\nDocs: Abstract Equality Comparison lần lượt áp dụng ToBoolean, ToPrimitive và ToNumber cho phép toán khác kiểu.\nVí dụ: [] == ![] // true trong trình duyệt.'
  },
  {
    id: 42,
    type: 'Level 4 - Phân tích',
    question:
      'Cho hai mảng arr1 = [1, 2] và arr2 = [1, 2]. Hãy giải thích tại sao arr1 == arr2 và arr1 === arr2 đều trả về false.',
    answer:
      'Câu trả lời: arr1 và arr2 là hai object khác nhau trong bộ nhớ nên cả == lẫn === đều so sánh tham chiếu và nhận thấy chúng khác nhau.\nFeynman: Hai cuốn sách photo giống nhau vẫn là hai bản riêng biệt nên không thể xem là cùng một cuốn.\nDocs: EqualityComparison cho object chỉ trả true khi hai biến trỏ cùng địa chỉ.\nVí dụ: arr1 === arr1 // true trong khi arr1 === arr2 // false.'
  },
  {
    id: 43,
    type: 'Level 4 - Phân tích',
    question:
      'Tại sao biểu thức null == 0 trả về false nhưng null >= 0 lại trả về true? Hãy phân tích quy tắc so sánh của JavaScript.',
    answer:
      'Câu trả lời: null == 0 trả về false vì null chỉ bằng undefined trong so sánh ==; nhưng null >= 0 dùng quy tắc so sánh số, null được chuyển thành 0 rồi so sánh 0 >= 0 nên kết quả true.\nFeynman: Khi hỏi "có bằng nhau không?", null chỉ nhận người họ hàng undefined; khi hỏi "có lớn hơn hoặc bằng 0 không?" nó khoác áo số 0 để tham gia.\nDocs: Abstract Relational Comparison chuyển operand sang số trừ khi gặp undefined, trong khi Abstract Equality xử lý null khác biệt.\nVí dụ: null > 0 trả về false nhưng null >= 0 trả về true.'
  },
  {
    id: 44,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích đoạn mã sau và dự đoán kết quả. Giải thích tại sao.\n\nconst user = { name: "Alice" };\nconst userRef = user;\nuserRef.name = "Bob";\nconsole.log(user.name);',
    answer:
      'Câu trả lời: console.log in "Bob" vì userRef và user cùng trỏ tới một object; thay đổi thuộc tính qua userRef cũng thay đổi object mà user tham chiếu.\nFeynman: Cả hai chìa khóa đều mở cùng chiếc tủ nên khi bạn đục tên bằng một chìa khóa, chữ mới hiện ra với chìa kia.\nDocs: Objects là reference types nên gán userRef = user sao chép tham chiếu chứ không sao chép giá trị.\nVí dụ: Sau khi userRef.name = "Bob", cả user.name và userRef.name đều là "Bob".'
  },
  {
    id: 45,
    type: 'Level 4 - Phân tích',
    question:
      'Hãy phân tích các trường hợp mà việc sử dụng == thay vì === có thể dẫn đến lỗi logic khó phát hiện trong chương trình.',
    answer:
      'Câu trả lời: Dùng == dễ tạo bug khi so sánh với các giá trị falsy như 0, "", false hoặc khi vô tình chấp nhận cả null và undefined, khiến nhánh logic chạy sai.\nFeynman: Cho phép ép kiểu giống mở cửa cho người lạ trông giống bạn bè bước vào khiến bữa tiệc hỗn loạn.\nDocs: Abstract Equality cho phép chuyển đổi kiểu tự động dẫn tới những trường hợp khó đoán như "" == 0 hay false == 0.\nVí dụ: if (value == false) sẽ bắt cả 0, "", null và undefined nên khó kiểm soát.'
  },
  {
    id: 46,
    type: 'Level 4 - Phân tích',
    question:
      'Tại sao NaN là kiểu dữ liệu nguyên thủy duy nhất trong JavaScript không bằng chính nó (NaN === NaN là false)? Điều này có hệ quả gì?',
    answer:
      'Câu trả lời: NaN không bằng chính nó vì chuẩn IEEE 754 định nghĩa mọi so sánh bình đẳng với NaN đều là false; hệ quả là phải dùng Number.isNaN hoặc Object.is để phát hiện NaN.\nFeynman: NaN như một lời đồn không thể kiểm chứng—khi hỏi "bạn có phải chính bạn không?" nó vẫn trả lời không.\nDocs: ECMAScript tuân theo IEEE 754 nên NaN === NaN là false còn Object.is(NaN, NaN) mới cho true.\nVí dụ: Number.isNaN(NaN) // true; NaN === NaN // false.'
  },
  {
    id: 47,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích ưu và nhược điểm của việc JavaScript cho phép ép kiểu ngầm định.',
    answer:
      'Câu trả lời: Ép kiểu ngầm định giúp viết code ngắn gọn và xử lý linh hoạt các dữ liệu đến từ form hoặc JSON, nhưng cũng dễ tạo lỗi logic khó phát hiện vì các phép so sánh hoặc tính toán bất ngờ.\nFeynman: Nó giống nhạc jazz tự do—cảm hứng cao nhưng lơ đễnh một nhịp là chệch tông ngay.\nDocs: Các quy tắc ToPrimitive/ToString/ToNumber trong spec minh họa nguồn gốc của cả sức mạnh và rủi ro này.\nVí dụ: "" + 5 cho "5" hữu ích khi hiển thị, nhưng [] == 0 có thể khiến điều kiện hoạt động sai.'
  },
  {
    id: 48,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích thứ tự thực thi và kết quả cuối cùng của biểu thức sau: let result = "A" && 0 || "B" ?? "C".',
    answer:
      'Câu trả lời: Biểu thức "A" && 0 || "B" ?? "C" trả về "B": trước tiên "A" && 0 cho 0 vì && dừng ở toán hạng falsy; sau đó 0 || "B" cho "B"; cuối cùng "B" ?? "C" giữ nguyên "B" vì nó không nullish.\nFeynman: Hành trình qua ba cánh cửa: cửa && chặn bạn bằng số 0, cửa || trao tay bạn chữ "B", và cửa ?? thấy "B" đã đủ nên không đưa "C".\nDocs: Thứ tự ưu tiên là && rồi || rồi ?? theo bảng precedence trong ECMAScript.\nVí dụ: let result = "A" && 0 || "B" ?? "C"; console.log(result); // "B".'
  },
  {
    id: 49,
    type: 'Level 4 - Phân tích',
    question:
      'So sánh cách optional chaining ?. và toán tử && có thể được dùng để kiểm tra sự tồn tại của thuộc tính lồng nhau. Phân tích ưu điểm của ?. so với &&.',
    answer:
      'Câu trả lời: obj && obj.a && obj.a.b kiểm tra thủ công từng cấp, trong khi obj?.a?.b tự động dừng khi gặp nullish và vẫn cho phép nhận về giá trị falsy hợp lệ như 0.\nFeynman: ?. giống đường ray có công tắc tự động tránh ga hỏng, còn && buộc bạn tự xuống từng ga và có thể lỡ chuyến khi thấy ga đông người dù tàu vẫn chạy.\nDocs: Optional chaining bỏ qua chỉ khi toán hạng trước nullish, tránh đánh rơi các giá trị falsy hợp lệ.\nVí dụ: const obj = { a: { count: 0 } }; if (obj && obj.a && obj.a.count) console.log("bị bỏ qua"); // không in vì 0 falsy; if ((obj?.a?.count ?? -1) === 0) console.log("đếm được"); // in.'
  },
  {
    id: 50,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích và dự đoán kết quả của đoạn mã sau:\n\nconsole.log(a); // Output 1?\nvar a = 10;\nconsole.log(b); // Output 2?\nlet b = 10;',
    answer:
      'Câu trả lời: Dòng đầu in undefined vì var a được hoisting và gán giá trị mặc định undefined; dòng thứ hai ném ReferenceError do let b cũng hoisted nhưng nằm trong temporal dead zone cho tới khi được gán.\nFeynman: Biến a giống chiếc hộp đã đặt sẵn nhưng bỏ trống, còn b bị khóa tạm thời nên chưa thể mở trước khi chính thức đặt vào vị trí.\nDocs: Hoisting của var đặt binding vào môi trường toàn cục, còn let tạo TDZ cho đến sau dòng khai báo.\nVí dụ: Chạy đoạn mã trên sẽ in undefined rồi lỗi ReferenceError: Cannot access "b" before initialization.'
  },
  {
    id: 51,
    type: 'Level 4 - Phân tích',
    question:
      'Chỉ ra vấn đề trong đoạn mã sau khi config.timeout có giá trị là 0. Đề xuất cách sửa lỗi.\n\nfunction start(timeout) { /* ... */ }\nconst timeoutValue = config.timeout || 5000;\nstart(timeoutValue);',
    answer:
      'Câu trả lời: Khi config.timeout là 0, biểu thức config.timeout || 5000 chọn 5000 vì 0 là falsy, khiến bạn bỏ qua giá trị hợp lệ.\nFeynman: Bạn xem 0 như tín hiệu "không có gì" nên tự ý thay bằng 5000, giống như gạt bỏ người đi giày màu đen vì tưởng họ vắng mặt.\nDocs: LogicalOR coi mọi falsy là thiếu, nên với trường hợp chỉ muốn xử lý nullish cần dùng ??.\nVí dụ: const timeoutValue = config.timeout ?? 5000; start(timeoutValue); // giữ được 0.'
  },
  {
    id: 52,
    type: 'Level 4 - Phân tích',
    question:
      'So sánh !!value với Boolean(value). Chúng có luôn cho cùng một kết quả không? Về mặt hiệu suất và tính dễ đọc, bạn ưu tiên cách nào hơn?',
    answer:
      'Câu trả lời: !!value và Boolean(value) luôn cho cùng kết quả vì cả hai đều chuyển đổi giá trị sang boolean theo cùng thuật toán; Boolean(value) dễ đọc hơn và hiệu suất tương đương.\nFeynman: !! giống bật tắt công tắc hai lần để quay về trạng thái thật, còn Boolean giống nhấn nút "hãy nói thật đi" rõ ràng hơn.\nDocs: Cả toán tử ! và hàm Boolean đều dựa trên ToBoolean trong đặc tả nên kết quả trùng khớp.\nVí dụ: Boolean([]) === !![] // true.'
  },
  {
    id: 53,
    type: 'Level 4 - Phân tích',
    question:
      'Phân tích sự khác nhau khi truy cập obj.a.b trong hai trường hợp: obj?.a.b và obj?.a?.b. Khi nào trường hợp đầu tiên sẽ gây ra lỗi?',
    answer:
      'Câu trả lời: obj?.a.b chỉ kiểm tra obj có nullish hay không rồi cố truy cập a.b, nên nếu obj.a là undefined sẽ ném lỗi khi đọc b; obj?.a?.b kiểm tra cả cấp a trước khi đụng tới b nên an toàn hơn.\nFeynman: Trường hợp đầu giống nhìn thấy căn nhà đã có chủ nên lao vào tầng hai mà quên kiểm tra khóa tầng một.\nDocs: Optional chaining phải được áp dụng tại mỗi cấp muốn an toàn, nếu bỏ ? ở giữa thì truy cập thuộc tính vẫn xảy ra.\nVí dụ: const obj = {}; obj?.a.b; // TypeError, trong khi obj?.a?.b trả về undefined.'
  },
  {
    id: 54,
    type: 'Level 5 - Phản biện',
    question:
      'Quan điểm: "Việc sử dụng var trong phát triển JavaScript hiện đại luôn là một thói quen xấu". Hãy lập luận ủng hộ hoặc phản đối quan điểm này.',
    answer:
      'Câu trả lời: Tôi ủng hộ quan điểm hạn chế var vì phạm vi function và hoisting của nó dễ tạo bug, nhưng vẫn có ngoại lệ khi duy trì mã legacy hoặc cần khai báo thuộc tính trên window.\nFeynman: var như con dao cùn—dùng sai dễ đứt tay, nhưng đôi lúc trong bếp cũ bạn chưa có dụng cụ mới.\nDocs: Các hướng dẫn hiện đại (MDN, Airbnb) khuyến nghị dùng let/const thay var để tránh scope rộng và hoisting khó đoán.\nVí dụ: Trong code mới hãy dùng let/const, còn trong module cũ chỉ giữ var nếu việc thay đổi gây rủi ro lớn.'
  },
  {
    id: 55,
    type: 'Level 5 - Phản biện',
    question:
      'Ép kiểu ngầm định làm cho việc lập trình JavaScript trở nên linh hoạt và ngắn gọn hơn, hay khó gỡ lỗi và dễ gây sai lầm hơn? Hãy bảo vệ quan điểm của bạn.',
    answer:
      'Câu trả lời: Ép kiểu ngầm định giúp code gọn và tương thích với dữ liệu đầu vào linh hoạt, nhưng dễ gây lỗi khó gỡ nếu không kiểm soát, nên tôi thiên về dùng nó một cách có chủ đích và được kiểm thử.\nFeynman: Đây là con dao hai lưỡi—cắt rau rất nhanh nhưng bạn phải chú ý tay mình.\nDocs: Những quy tắc ToPrimitive/ToNumber giải thích vì sao biểu thức như [] == 0 xảy ra, nên lint rule và review cần để mắt.\nVí dụ: Chấp nhận ép kiểu trong 5 + "" để xuất chuỗi, nhưng tránh so sánh lỏng lẻo như userInput == 0.'
  },
  {
    id: 56,
    type: 'Level 5 - Phản biện',
    question:
      'Một lập trình viên cho rằng việc luôn luôn sử dụng const trừ khi chắc chắn cần gán lại giá trị là một quy tắc quá cứng nhắc. Hãy đưa ra các lập luận ủng hộ và phản đối quy tắc này.',
    answer:
      'Câu trả lời: Quy tắc "dùng const trừ khi cần gán lại" mang đến độ rõ ràng và an toàn, song cũng có thể cứng nhắc trong đoạn mã thử nghiệm hoặc nơi giá trị biến đổi liên tục; giải pháp là dùng const theo mặc định nhưng linh hoạt chuyển sang let khi có lý do rõ ràng.\nFeynman: Đó là hàng rào chắc chắn bảo vệ khu vườn, nhưng đôi lúc cần mở cổng cho xe chở cây vào.\nDocs: Style guide như Airbnb khuyên dùng const để tránh reassign ngẫu nhiên, trong khi Google stylebook nhấn mạnh sự rõ ràng của ý định.\nVí dụ: Khai báo const config = { apiUrl: "/api" } và chỉ dùng let index cho biến đếm thay đổi.'
  },
  {
    id: 57,
    type: 'Level 5 - Phản biện',
    question:
      'Toán tử optional chaining ?. có thể che giấu các lỗi logic tiềm ẩn trong chương trình (ví dụ: tại sao một đối tượng lại là undefined?). Hãy thảo luận về ưu và nhược điểm của nó trong việc đảm bảo an toàn code và gỡ lỗi.',
    answer:
      'Câu trả lời: Optional chaining giảm crash do truy cập thuộc tính sâu trên dữ liệu thiếu, nhưng nếu lạm dụng có thể che giấu lỗi nguồn dữ liệu bị null; cân bằng bằng cách log hoặc validate ở biên giới dữ liệu rồi dùng ?. trong phần còn lại.\nFeynman: Nó giống con đường vòng tránh ổ gà—an toàn hơn nhưng cũng khiến bạn bỏ lỡ việc sửa con đường chính.\nDocs: TC39 khuyến nghị dùng ?. cho dữ liệu không chắc chắn nhưng vẫn yêu cầu kiểm soát logic tại nguồn.\nVí dụ: Kiểm tra user?.profile?.email ?? log lỗi nếu email đáng lẽ phải tồn tại.'
  },
  {
    id: 58,
    type: 'Level 5 - Phản biện',
    question:
      'Việc JavaScript có cả null và undefined có gây ra sự nhầm lẫn không cần thiết không? Nếu là nhà thiết kế ngôn ngữ, bạn sẽ giữ lại cả hai, loại bỏ một, hay hợp nhất chúng? Bảo vệ quyết định của bạn.',
    answer:
      'Câu trả lời: Việc tồn tại cả null và undefined dễ gây nhầm lần đầu, nhưng tôi sẽ giữ cả hai: undefined đại diện cho "không được gán" ở mức ngôn ngữ, còn null cho "trống có chủ đích" do lập trình viên quyết định.\nFeynman: Một biển báo viết "chưa lắp" khác với biển báo "đã tháo ra", chúng phục vụ hai thông điệp riêng.\nDocs: ECMAScript giữ cả hai để tương thích với lịch sử và cho phép API diễn đạt rõ ràng hơn.\nVí dụ: Thư viện có thể trả về null khi không tìm thấy bản ghi, trong khi thuộc tính thiếu sẽ là undefined.'
  },
  {
    id: 59,
    type: 'Level 5 - Phản biện',
    question:
      'Phê bình thiết kế của toán tử && và || khi chúng không luôn trả về true/false mà trả về giá trị của một trong hai toán hạng. Thiết kế này có ưu điểm và nhược điểm gì?',
    answer:
      'Câu trả lời: Thiết kế để && và || trả về chính toán hạng giúp chúng trở thành công cụ short-circuit và cung cấp giá trị mặc định linh hoạt, nhưng cũng gây bất ngờ cho người mới vì không luôn nhận được boolean.\nFeynman: Đó là những cánh cửa vừa trả lời vừa đưa luôn món đồ ở bên trong cho bạn.\nDocs: LogicalAND/OR trong spec trả về operand được đánh giá cuối cùng thay vì boolean literal.\nVí dụ: const handler = value && value.method; handler là hàm hoặc undefined, không phải true/false.'
  },
  {
    id: 60,
    type: 'Level 5 - Phản biện',
    question:
      'Một lập trình viên đề xuất nên cấu hình công cụ linting để báo lỗi tất cả các trường hợp sử dụng ==. Hãy đánh giá tác động tích cực và tiêu cực của quy tắc này đối với một dự án lớn.',
    answer:
      'Câu trả lời: Bật lint rule cấm == giúp loại bỏ hàng loạt bug ép kiểu trong dự án lớn, nhưng cũng buộc bạn viết dài hơn khi cần so sánh null/undefined hoặc dựa vào hành vi lỏng; giải pháp là cho phép ngoại lệ có chú thích khi thực sự cần.\nFeynman: Giống quy định không được lái quá 50 km/h—an toàn hơn nhưng có lúc bạn cần vượt nhanh để vào bệnh viện.\nDocs: ESLint quy tắc eqeqeq hỗ trợ tùy chọn allow-null để xử lý ngoại lệ.\nVí dụ: Dùng === trong toàn bộ code, riêng chỗ kiểm tra value == null có thể cho phép khi muốn bắt cả null lẫn undefined.'
  },
  {
    id: 61,
    type: 'Level 5 - Phản biện',
    question:
      'So sánh việc dùng default parameters của hàm (function greet(name = "Guest")) với việc dùng ?? trong thân hàm (name = name ?? "Guest"). Trong trường hợp nào nên chọn cách nào?',
    answer:
      'Câu trả lời: Default parameter áp dụng ngay khi đối số là undefined và giữ cho chữ ký hàm tự mô tả, trong khi dùng ?? trong thân hàm cho phép áp dụng thêm logic hoặc xử lý null riêng; chọn default parameter khi giá trị mặc định cố định và không phụ thuộc context, chọn ?? khi cần kiểm tra hoặc ghi log trước khi đặt mặc định.\nFeynman: Default parameter giống chuẩn bị sẵn ly nước trước cửa, còn ?? như kiểm tra lại khách khi họ đã ngồi xuống.\nDocs: ECMAScript áp dụng default parameter ở thời điểm gọi hàm, trong khi toán tử ?? diễn ra bên trong thân hàm sau khi có thêm ngữ cảnh.\nVí dụ: function greet(name = "Guest") { return `Hi ${name}`; } so với function greet(name) { const safeName = (name ?? "Guest").trim(); return `Hi ${safeName}`; }.'
  },
  {
    id: 62,
    type: 'Level 5 - Phản biện',
    question:
      'Trong một codebase cũ đang sử dụng var, chiến lược nào tốt hơn: (a) giữ nguyên để tránh rủi ro, (b) chuyển đổi toàn bộ sang let/const, hay (c) chỉ chuyển đổi khi sửa đổi file? Phân tích các tiêu chí để ra quyết định.',
    answer:
      'Câu trả lời: Với codebase cũ, chiến lược chuyển dần (chỉ đổi khi chạm vào file) cân bằng giữa an toàn và tiến hóa: giữ nguyên phần ổn định, mỗi lần sửa hãy nâng cấp sang let/const và thêm test; giữ nguyên hoàn toàn bỏ lỡ lợi ích, còn chuyển đồng loạt dễ tạo bug và tốn sức review.\nFeynman: Sửa căn nhà đang ở tốt nhất là cải tạo từng phòng khi có dịp, không đập toàn bộ cũng không bỏ mặc mãi mãi.\nDocs: Các nhóm lớn như Node.js cũng áp dụng chiến lược incremental refactor để giảm rủi ro.\nVí dụ: Khi sửa module utils.js, chuyển var cũ sang const/let và thêm kiểm thử, nhưng để nguyên module chưa đụng tới cho tới khi có kế hoạch rõ ràng.'
  },
  {
    id: 63,
    type: 'Level 5 - Phản biện',
    question:
      'Một người cho rằng template string chỉ là "cú pháp đường" (syntactic sugar) và không thực sự cần thiết. Bạn có đồng ý không? Hãy phản biện lại quan điểm này bằng cách nêu bật những lợi ích cốt lõi của nó.',
    answer:
      'Câu trả lời: Tôi phản biện ý kiến cho rằng template string chỉ là syntactic sugar vì chúng mang lại khả năng nội suy an toàn, hỗ trợ nhiều dòng, và tạo tiền đề cho tagged template xử lý bảo mật như escape HTML.\nFeynman: Đây không chỉ là lớp đường phủ lên bánh mà là cả khuôn bánh mới giúp món ăn chắc chắn hơn.\nDocs: Template literals trong ECMAScript 2015 thêm tính năng như raw strings và tag functions mà phép nối chuỗi không thể cung cấp.\nVí dụ: safeHTML`<p>${userInput}</p>` giúp tránh XSS, điều mà "Chuỗi " + userInput + "" không làm được.'
  },
  {
    id: 64,
    type: 'Level 6 - Master',
    question:
      'Thiết kế một bộ quy tắc lập trình (coding convention) cho một đội ngũ junior, tập trung vào việc khai báo biến (let, const, var) và so sánh (==, ===). Hãy bảo vệ mỗi quy tắc bạn đưa ra bằng các lập luận về tính an toàn, dễ đọc và dễ bảo trì.',
    answer:
      'Câu trả lời: 1) Dùng const mặc định để nhấn mạnh tính bất biến và giúp review dễ phát hiện thay đổi ngoài ý muốn. 2) Chuyển sang let khi cần gán lại, ghi chú lý do nếu biến sống lâu để giữ code dễ đọc. 3) Cấm var, trừ khi đang chỉnh file legacy không thể thay vì tránh scope rộng và hoisting khó đoán. 4) Dùng ===/!== cho mọi so sánh, chỉ dùng == khi thực sự cần bắt đồng thời null và undefined và phải kèm comment. 5) Luôn đặt ngoặc rõ ràng khi kết hợp toán tử so sánh với logic để tránh hiểu nhầm.\nFeynman: Bộ quy tắc như biển chỉ dẫn tại công viên giúp người mới không lạc đường và người cũ di chuyển nhanh hơn.\nDocs: Tham chiếu Airbnb style guide và MDN best practices hỗ trợ lập luận về const/let và strict equality.\nVí dụ: Viết const role = user?.role ?? "guest"; if (count === 0) ... thay cho var role; if (count == 0) ....'
  },
  {
    id: 65,
    type: 'Level 6 - Master',
    question:
      'Viết một hàm formatUserProfile(user) nhận vào một đối tượng user có thể thiếu dữ liệu và trả về một chuỗi mô tả người dùng. Hàm phải sử dụng kết hợp template literals, optional chaining, và nullish coalescing để xử lý các trường hợp thiếu dữ liệu một cách linh hoạt và an toàn.',
    answer:
      'Câu trả lời: function formatUserProfile(user) { const name = user?.name ?? "Ẩn danh"; const email = user?.contact?.email ?? "Chưa cung cấp email"; const age = user?.age ?? "không rõ tuổi"; return `Người dùng ${name}, ${age}, liên hệ: ${email}.`; }\nFeynman: Dù hồ sơ thiếu mục nào, hàm vẫn kể lại câu chuyện mạch lạc bằng cách điền từ thay thế hợp lý.\nDocs: Kết hợp optional chaining và nullish coalescing xử lý dữ liệu thiếu mà không cần chuỗi điều kiện dài.\nVí dụ: formatUserProfile({ name: "Minh" }) trả về "Người dùng Minh, không rõ tuổi, liên hệ: Chưa cung cấp email.".'
  },
  {
    id: 66,
    type: 'Level 6 - Master',
    question:
      'Tưởng tượng bạn đang tạo một quy tắc cho ESLint để cảnh báo lập trình viên về những trường hợp ép kiểu ngầm định tiềm ẩn nguy hiểm (ví dụ: khi dùng + với các kiểu dữ liệu khác nhau, hoặc == với null). Mô tả những mẫu mã (code patterns) mà quy tắc của bạn sẽ tìm kiếm.',
    answer:
      'Câu trả lời: Quy tắc sẽ tìm BinaryExpression dùng toán tử + với một vế là string literal hoặc TemplateLiteral rỗng và vế kia không phải string rõ ràng, các phép == hoặc != với null, 0, "" hoặc true/false, cũng như biểu thức cộng trừ giữa Date và chuỗi; phát hiện chúng để cảnh báo nguy cơ ép kiểu ngầm.\nFeynman: Giống chó săn đánh hơi những mùi lạ của kiểu dữ liệu trộn lẫn rồi sủa lên trước khi sự cố xảy ra.\nDocs: ESLint cho phép viết rule dựa trên AST nodes như BinaryExpression và Literal để phân tích pattern.\nVí dụ: Rule gắn cờ 5 + "5" hoặc status == null với thông điệp đề nghị dùng === và chuyển đổi kiểu tường minh.'
  },
  {
    id: 67,
    type: 'Level 6 - Master',
    question:
      'Viết một hàm safeGet(obj, path, defaultValue) nhận vào một đối tượng, một chuỗi path (ví dụ: "a.b.c"), và một giá trị mặc định. Hàm này phải trả về giá trị tại path hoặc defaultValue nếu bất kỳ phần nào của path không tồn tại, mà không được sử dụng optional chaining ?..',
    answer:
      'Câu trả lời: function safeGet(obj, path, defaultValue) { if (obj == null) return defaultValue; const keys = path.split("."); let current = obj; for (const key of keys) { if (current == null || !Object.prototype.hasOwnProperty.call(current, key)) { return defaultValue; } current = current[key]; } return current; }\nFeynman: Ta đi qua từng trạm trong bản đồ, thiếu trạm nào thì quay về với giá trị dự phòng thay vì lao vào ngõ cụt.\nDocs: Sử dụng hasOwnProperty và kiểm tra null giúp tái tạo hành vi optional chaining mà không dùng cú pháp mới.\nVí dụ: safeGet({ a: { b: 5 } }, "a.b", 0) // 5; safeGet({}, "a.b", 0) // 0.'
  },
  {
    id: 68,
    type: 'Level 6 - Master',
    question:
      'Thiết kế một hàm mergeConfigs(...configs) nhận vào một số lượng không giới hạn các đối tượng cấu hình. Hàm phải hợp nhất chúng lại theo quy tắc: thuộc tính của đối tượng sau sẽ ghi đè lên đối tượng trước, nhưng chỉ khi giá trị đó không phải là null hoặc undefined.',
    answer:
      'Câu trả lời: function mergeConfigs(...configs) { return configs.reduce((result, config) => { if (config == null) return result; for (const [key, value] of Object.entries(config)) { if (value !== null && value !== undefined) { result[key] = value; } } return result; }, {}); }\nFeynman: Mỗi cấu hình mới đặt lên chồng bánh, nhưng nếu lớp mới chỉ toàn khoảng trống thì ta giữ nguyên lớp cũ bên dưới.\nDocs: Object.entries và reduce cho phép duyệt tuần tự, điều kiện value !== null && value !== undefined đảm bảo chỉ ghi đè bằng giá trị hữu ích.\nVí dụ: mergeConfigs({ retry: 3 }, { retry: null, timeout: 1000 }, { timeout: 2000 }) cho { retry: 3, timeout: 2000 }.'
  },
  {
    id: 69,
    type: 'Level 6 - Master',
    question:
      'Viết một tagged template tên là safeHTML để loại bỏ các ký tự HTML nguy hiểm (<, >, &, ") khỏi các biến được nội suy vào chuỗi. Trình bày cách hoạt động và ví dụ sử dụng.',
    answer:
      'Câu trả lời: function safeHTML(strings, ...values) { const escape = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); return strings.reduce((result, chunk, index) => { const escaped = index < values.length ? escape(values[index]) : ""; return result + chunk + escaped; }, ""); }\nFeynman: Giống bộ lọc nước loại bỏ tạp chất trước khi rót vào cốc, mọi biến nội suy được khử ký tự nguy hiểm trước khi ghép vào HTML.\nDocs: Tagged template literal nhận mảng strings và giá trị, cho phép xử lý từng giá trị trước khi hợp nhất.\nVí dụ: const userInput = "<script>alert(\\"xss\\")</script>"; const html = safeHTML`<p>${userInput}</p>`; // "<p>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</p>".'
  },
  {
    id: 70,
    type: 'Level 6 - Master',
    question:
      'Đề xuất một checklist gồm 10 điểm quan trọng nhất để review code của một lập trình viên khác, chỉ tập trung vào các kiến thức thuộc "Language Basics" (khai báo biến, toán tử, ép kiểu, xử lý giá trị rỗng/thiếu,...) nhằm đảm bảo code an toàn và dễ bảo trì.',
    answer:
      'Câu trả lời: 1) Kiểm tra biến khai báo bằng const/let đúng mục đích. 2) Đảm bảo không còn var mới. 3) Xem các phép so sánh dùng ===/!== trừ khi kiểm tra nullish có chủ đích. 4) Rà soát logic với ?? và || có dùng đúng tiêu chí nullish hay falsy. 5) Đảm bảo ép kiểu tường minh khi chuyển đổi dữ liệu đầu vào. 6) Kiểm tra xử lý giá trị rỗng "", null, undefined nhất quán. 7) Quan sát short-circuit với &&/|| có thể bỏ qua giá trị 0 hoặc "". 8) Đảm bảo template literal dùng đúng và tránh nối chuỗi lẻ. 9) Kiểm tra thao tác với object/array có kiểm tra tồn tại trước khi truy cập thuộc tính. 10) Đảm bảo hàm pure không vô tình sửa object tham chiếu.\nFeynman: Checklist như bảng điều khiển trước khi cất cánh giúp phát hiện lỗi cơ bản về ngôn ngữ trước khi quá muộn.\nDocs: Các best practice từ MDN và ESLint làm nền tảng cho danh sách này.\nVí dụ: Khi review file utils, tick từng mục để chắc chắn code xử lý null/undefined bằng ?? thay vì || nếu cần giữ giá trị 0.'
  }
]

// Validate data on export
export const validatedFlashcards = FlashcardValidator.validateFlashcards(flashcardsData)

// ===== HƯỚNG DẪN SỬ DỤNG =====
//
// 1. THÊM FLASHCARD MỚI:
// {
//   id: 71,                          // ID unique (không trùng)
//   type: 'Tên loại',                // Loại flashcard
//   question: 'Câu hỏi',             // Mặt trước
//   answer: 'Câu trả lời'            // Mặt sau
// }
//
// 2. SỬA FLASHCARD:
// - Thay đổi nội dung question, answer, hoặc type
// - Giữ nguyên id để không bị lỗi
//
// 3. XÓA FLASHCARD:
// - Xóa object tương ứng
// - Hoặc comment lại với //
//
// 4. LƯU Ý:
// - ID phải là số duy nhất
// - Type có thể trùng để phân nhóm
// - Không giới hạn số lượng flashcard
// - Lưu file để thấy thay đổi
//
// =============================
