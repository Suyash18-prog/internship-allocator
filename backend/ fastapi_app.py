# deleted duplicate file

def read_companies():
    companies = []
    if not os.path.exists(DATA_FILE):
        return companies
    with open(DATA_FILE, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Convert Capacity and Stipend to appropriate types if present
            if row.get('Capacity'):
                row['Capacity'] = int(row['Capacity'])
            if row.get('Stipend'):
                row['Stipend'] = float(row['Stipend'])
            companies.append(row)
    return companies

def write_companies(companies):
    with open(DATA_FILE, 'w', newline='') as csvfile:
        if companies:
            fieldnames = companies[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for company in companies:
                writer.writerow(company)
        else:
            # Write headers only
            writer = csv.writer(csvfile)
            writer.writerow(['Name', 'Domain', 'Capacity', 'Stipend'])

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/companies", response_model=List[Company])
def get_companies():
    companies = read_companies()
    return companies

@app.post("/companies", response_model=Company)
def add_company(company: Company):
    companies = read_companies()
    for c in companies:
        if c['Name'] == company.Name:
            raise HTTPException(status_code=400, detail="Company already exists")
    companies.append(company.dict())
    write_companies(companies)
    return company

@app.put("/companies/{company_name}", response_model=Company)
def update_company(company_name: str, company: Company):
    companies = read_companies()
    for i, c in enumerate(companies):
        if c['Name'] == company_name:
            companies[i] = company.dict()
            write_companies(companies)
            return company
    raise HTTPException(status_code=404, detail="Company not found")

@app.delete("/companies/{company_name}")
def delete_company(company_name: str):
    companies = read_companies()
    new_companies = [c for c in companies if c['Name'] != company_name]
    if len(new_companies) == len(companies):
        raise HTTPException(status_code=404, detail="Company not found")
    write_companies(new_companies)
    return {"detail": "Company deleted"}

@app.post("/recommendations")
def recommend_companies(domain: str):
    companies = read_companies()
    recommended = [c for c in companies if c.get('Domain') == domain]
    return recommended

@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    file_location = os.path.join(RESUMES_DIR, file.filename)
    with open(file_location, "wb") as f:
        content = await file.read()
        f.write(content)
    return {"filename": file.filename}