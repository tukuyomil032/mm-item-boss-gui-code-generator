import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { docData, allDocEntries } from '../tooltips';


const filterData = (data: Record<string, string>, term: string): Record<string, string> | null => {
  if (!term) return data;
  const lowerTerm = term.toLowerCase();
  const result: Record<string, string> = {};
  let found = false;
  
  for (const [key, value] of Object.entries(data)) {
    if (key.toLowerCase().includes(lowerTerm) || value.toLowerCase().includes(lowerTerm)) {
      result[key] = value;
      found = true;
    }
  }
  return found ? result : null; 
};

const DocSection: React.FC<{ title: string; data: Record<string, string> | null }> = ({ title, data }) => {
  if (!data) {
    return (
      <div className="form-section" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <h3>{title}</h3>
        <p style={{ color: 'var(--text-color-muted)' }}>検索結果に一致する項目がありません。</p>
      </div>
    );
  }
  
  return (
    <div className="form-section" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key} style={{ borderBottom: '1px solid var(--panel-border)', padding: '10px 0' }}>
            <strong style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>{key}</strong>
            <p style={{ 
              margin: '5px 0 0 10px', 
              whiteSpace: 'pre-wrap', 
              display: title === 'Mob Types' ? 'inline' : 'block' 
            }}>
              {title === 'Mob Types' ? ` - ${value}` : value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};


const LocalSearchBot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input || isLoading) return;
    
    const userMessage = { role: 'user', text: input } as const;
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 300)); 

    const lowerInput = input.toLowerCase();
    const results = [];

    for (const entry of allDocEntries) {
      const keyMatch = entry.option.toLowerCase().includes(lowerInput);
      const descMatch = entry.description.toLowerCase().includes(lowerInput);
      const categoryMatch = entry.category.toLowerCase().includes(lowerInput);
      
      let score = 0;
      if (keyMatch) score = 3;
      else if (categoryMatch) score = 2;
      else if (descMatch) score = 1;

      if (score > 0) {
        results.push({ ...entry, score });
      }
    }

    results.sort((a, b) => b.score - a.score);

    let modelResponse = "";
    if (results.length > 0) {
      modelResponse = `「${input}」に関連する ${results.length} 件のオプションが見つかりました。\n\n`;
      results.slice(0, 3).forEach(res => {
        modelResponse += 
`--------------------
種別: ${res.type}
カテゴリ: ${res.category}
オプション名: ${res.option}
説明: ${res.description}
\n`;
      });
      if (results.length > 3) {
        modelResponse += `\n...他 ${results.length - 3} 件。 (詳細は右の検索機能をお使いください)`;
      }
    } else {
      modelResponse = `「${input}」に関連するオプションは見つかりませんでした。スペルやキーワードを変えてお試しください。`;
    }
    setChatHistory(prev => [...prev, { role: 'model', text: modelResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="config-panel" style={{ background: 'var(--panel-bg)' }}>
      <h3>Help Chat</h3>
      <p style={{ color: 'var(--text-color-muted)', fontSize: '0.9em', marginTop: '-15px' }}>
        あなたの探しているオプションをデータベースから検索します
      </p>
      
      <div className="chat-history" style={{ flexGrow: 1, minHeight: '300px', maxHeight: '500px', overflowY: 'auto', border: '1px solid var(--panel-border)', borderRadius: '6px', padding: '10px', marginBottom: '10px', background: 'var(--input-bg)' }}>
        {chatHistory.length === 0 && (
          <p style={{ color: 'var(--text-color-muted)', textAlign: 'center', marginTop: '50px' }}>
            e.x): Health, Prevent, Display ...etc
          </p>
        )}
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong style={{ color: msg.role === 'user' ? 'var(--accent-color)' : 'var(--text-color)' }}>
              {msg.role === 'user' ? 'You:' : 'Bot:'}
            </strong>
            <p style={{ margin: '5px 0 0 10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</p>
          </div>
        ))}
        {isLoading && <p style={{ color: 'var(--text-color-muted)' }}>Searching...</p>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "..." : "Type Here"} 
          disabled={isLoading}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="button button-primary" onClick={handleSend} disabled={isLoading}>
          送信
        </button>
      </div>
    </div>
  );
};


export const DocsPage: React.FC = () => {
  const [docType, setDocType] = useState<'boss' | 'item'>('boss');
  const [activeCategory, setActiveCategory] = useState<string>('Internal Name'); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleDocTypeChange = (type: 'boss' | 'item') => {
    setDocType(type);
    setActiveCategory(docData[type][0].name); 
    setSearchTerm('');
  };

  const handleCategoryChange = (name: string) => {
    setActiveCategory(name);
    setSearchTerm('');
  };

  const filteredCategoryData = useMemo(() => {
    const category = docData[docType].find(cat => cat.name === activeCategory);
    if (!category) return null;
    const filtered = filterData(category.data, searchTerm);
    return {
      name: category.name,
      data: filtered,
    };
  }, [docType, activeCategory, searchTerm]);

  return (
    <main className="app-layout docs-layout">
            <LocalSearchBot />
      <div className="config-panel">
        <div className="output-header">
          <h2>Options Documentation</h2>
          <Link to="/">
            <button className="button button-primary">Back to Generator</button>
          </Link>
        </div>
        <div className="form-section">
          <h3>Documentation Type</h3>
          <div className="type-selector">
            <button
              className={`button ${docType === "boss" ? "button-primary" : ""}`}
              onClick={() => handleDocTypeChange("boss")}
            >
              Boss
            </button>
            <button
              className={`button ${docType === "item" ? "button-primary" : ""}`}
              onClick={() => handleDocTypeChange("item")}
            >
              Item
            </button>
          </div>
        </div>
        <div className="form-section">
          <h3>Category</h3>
          <div className="type-selector" style={{ flexWrap: 'wrap' }}>
            {docData[docType].map((category) => (
              <button
                key={category.name}
                className={`button ${activeCategory === category.name ? "button-primary" : ""}`}
                onClick={() => handleCategoryChange(category.name)}
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="form-section">
          <h3>Search in '{activeCategory}' (英語・日本語)</h3>
          <div className="form-group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`'${activeCategory}' の中から検索...`}
            />
          </div>
        </div>
        {filteredCategoryData ? (
          <DocSection 
            title={filteredCategoryData.name} 
            data={filteredCategoryData.data} 
          />
        ) : (
          <p>カテゴリを選択してください。</p>
        )}
      </div>
    </main>
  );
};